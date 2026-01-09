/**
 * API routes for arguments
 */

import express, { Request, Response } from 'express';
import { body, param, query as queryValidator, validationResult } from 'express-validator';
import { query } from '../database/connection';
import { ReasonRankCalculator } from '@ideastockexchange/core';

const router = express.Router();

/**
 * GET /api/arguments
 * List all arguments with optional filtering
 */
router.get(
  '/',
  [
    queryValidator('search').optional().isString(),
    queryValidator('tag').optional().isString(),
    queryValidator('limit').optional().isInt({ min: 1, max: 100 }),
    queryValidator('offset').optional().isInt({ min: 0 }),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const searchTerm = req.query.search as string;
      const limit = parseInt(req.query.limit as string) || 20;
      const offset = parseInt(req.query.offset as string) || 0;

      let queryText = `
        SELECT
          a.id, a.title, a.description,
          a.manual_truth_score, a.calculated_truth_score,
          a.created_at, a.updated_at,
          u.username as created_by_username,
          COUNT(DISTINCT e.id) as evidence_count
        FROM arguments a
        LEFT JOIN users u ON a.created_by = u.id
        LEFT JOIN evidence e ON a.id = e.argument_id
        WHERE a.is_deleted = FALSE
      `;

      const params: any[] = [];

      if (searchTerm) {
        params.push(searchTerm);
        queryText += ` AND (a.title ILIKE $${params.length} OR a.description ILIKE $${params.length})`;
      }

      queryText += `
        GROUP BY a.id, u.username
        ORDER BY a.created_at DESC
        LIMIT $${params.length + 1} OFFSET $${params.length + 2}
      `;

      params.push(limit, offset);

      const result = await query(queryText, params);

      res.json({
        arguments: result.rows,
        total: result.rowCount,
        limit,
        offset
      });
    } catch (error) {
      console.error('Error fetching arguments:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * GET /api/arguments/:id
 * Get a single argument with all details
 */
router.get(
  '/:id',
  [param('id').isUUID()],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;

      // Get argument
      const argResult = await query(
        `SELECT
          a.*,
          u.username as created_by_username
        FROM arguments a
        LEFT JOIN users u ON a.created_by = u.id
        WHERE a.id = $1 AND a.is_deleted = FALSE`,
        [id]
      );

      if (argResult.rows.length === 0) {
        return res.status(404).json({ error: 'Argument not found' });
      }

      const argument = argResult.rows[0];

      // Get evidence
      const evidenceResult = await query(
        `SELECT * FROM evidence WHERE argument_id = $1 ORDER BY truth_score DESC`,
        [id]
      );

      // Get supporting arguments
      const supportingResult = await query(
        `SELECT
          al.*,
          a.title as sub_argument_title,
          a.calculated_truth_score
        FROM argument_links al
        JOIN arguments a ON al.sub_argument_id = a.id
        WHERE al.parent_argument_id = $1
          AND al.link_type = 'supporting'
          AND a.is_deleted = FALSE
        ORDER BY al.importance_weight DESC`,
        [id]
      );

      // Get opposing arguments
      const opposingResult = await query(
        `SELECT
          al.*,
          a.title as sub_argument_title,
          a.calculated_truth_score
        FROM argument_links al
        JOIN arguments a ON al.sub_argument_id = a.id
        WHERE al.parent_argument_id = $1
          AND al.link_type = 'opposing'
          AND a.is_deleted = FALSE
        ORDER BY al.importance_weight DESC`,
        [id]
      );

      res.json({
        ...argument,
        evidence: evidenceResult.rows,
        supportingArguments: supportingResult.rows,
        opposingArguments: opposingResult.rows
      });
    } catch (error) {
      console.error('Error fetching argument:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * POST /api/arguments
 * Create a new argument
 */
router.post(
  '/',
  [
    body('title').isString().trim().isLength({ min: 10, max: 500 }),
    body('description').isString().trim().isLength({ min: 20, max: 10000 }),
    body('truthScore').optional().isFloat({ min: 0, max: 1 }),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, truthScore } = req.body;
      const userId = (req as any).user?.id; // From auth middleware

      const result = await query(
        `INSERT INTO arguments (title, description, manual_truth_score, created_by)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [title, description, truthScore || null, userId || null]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error creating argument:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * PUT /api/arguments/:id
 * Update an existing argument
 */
router.put(
  '/:id',
  [
    param('id').isUUID(),
    body('title').optional().isString().trim().isLength({ min: 10, max: 500 }),
    body('description').optional().isString().trim().isLength({ min: 20, max: 10000 }),
    body('truthScore').optional().isFloat({ min: 0, max: 1 }),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const { title, description, truthScore } = req.body;

      const updates: string[] = [];
      const params: any[] = [];
      let paramIndex = 1;

      if (title !== undefined) {
        params.push(title);
        updates.push(`title = $${paramIndex++}`);
      }
      if (description !== undefined) {
        params.push(description);
        updates.push(`description = $${paramIndex++}`);
      }
      if (truthScore !== undefined) {
        params.push(truthScore);
        updates.push(`manual_truth_score = $${paramIndex++}`);
      }

      if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      params.push(id);
      const result = await query(
        `UPDATE arguments
         SET ${updates.join(', ')}
         WHERE id = $${paramIndex} AND is_deleted = FALSE
         RETURNING *`,
        params
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Argument not found' });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating argument:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * DELETE /api/arguments/:id
 * Soft delete an argument
 */
router.delete(
  '/:id',
  [param('id').isUUID()],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;

      const result = await query(
        `UPDATE arguments SET is_deleted = TRUE WHERE id = $1 RETURNING id`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Argument not found' });
      }

      res.json({ message: 'Argument deleted successfully' });
    } catch (error) {
      console.error('Error deleting argument:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * POST /api/arguments/:id/calculate-score
 * Calculate and update the ReasonRank score for an argument
 */
router.post(
  '/:id/calculate-score',
  [param('id').isUUID()],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;

      // Fetch argument with all related data
      // This is simplified - in production, you'd need a more sophisticated query
      // or use the calculator with proper data loading

      const calculator = new ReasonRankCalculator();

      // TODO: Implement full argument tree loading and scoring
      // For now, return a placeholder

      res.json({
        message: 'Score calculation not fully implemented yet',
        argumentId: id
      });
    } catch (error) {
      console.error('Error calculating score:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default router;
