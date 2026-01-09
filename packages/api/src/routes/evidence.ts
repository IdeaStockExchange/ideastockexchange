/**
 * API routes for evidence
 */

import express, { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import { query } from '../database/connection';
import { EvidenceQuality } from '@ideastockexchange/core';

const router = express.Router();

/**
 * POST /api/arguments/:argumentId/evidence
 * Add evidence to an argument
 */
router.post(
  '/:argumentId/evidence',
  [
    param('argumentId').isUUID(),
    body('description').isString().trim().isLength({ min: 10, max: 2000 }),
    body('source').isString().trim().isLength({ min: 3, max: 500 }),
    body('url').optional().isURL(),
    body('quality').isIn(Object.values(EvidenceQuality)),
    body('truthScore').isFloat({ min: 0, max: 1 }),
    body('author').optional().isString().trim(),
    body('publicationDate').optional().isISO8601(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { argumentId } = req.params;
      const {
        description,
        source,
        url,
        quality,
        truthScore,
        author,
        publicationDate
      } = req.body;
      const userId = (req as any).user?.id;

      // Verify argument exists
      const argCheck = await query(
        'SELECT id FROM arguments WHERE id = $1 AND is_deleted = FALSE',
        [argumentId]
      );

      if (argCheck.rows.length === 0) {
        return res.status(404).json({ error: 'Argument not found' });
      }

      // Insert evidence
      const result = await query(
        `INSERT INTO evidence (
          argument_id, description, source, url, quality,
          truth_score, author, publication_date, added_by
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`,
        [
          argumentId,
          description,
          source,
          url || null,
          quality,
          truthScore,
          author || null,
          publicationDate || null,
          userId || null
        ]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding evidence:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * PUT /api/evidence/:id
 * Update evidence
 */
router.put(
  '/:id',
  [
    param('id').isUUID(),
    body('description').optional().isString().trim(),
    body('truthScore').optional().isFloat({ min: 0, max: 1 }),
    body('isVerified').optional().isBoolean(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const { description, truthScore, isVerified } = req.body;

      const updates: string[] = [];
      const params: any[] = [];
      let paramIndex = 1;

      if (description !== undefined) {
        params.push(description);
        updates.push(`description = $${paramIndex++}`);
      }
      if (truthScore !== undefined) {
        params.push(truthScore);
        updates.push(`truth_score = $${paramIndex++}`);
      }
      if (isVerified !== undefined) {
        params.push(isVerified);
        updates.push(`is_verified = $${paramIndex++}`);
      }

      if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      params.push(id);
      const result = await query(
        `UPDATE evidence
         SET ${updates.join(', ')}
         WHERE id = $${paramIndex}
         RETURNING *`,
        params
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Evidence not found' });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating evidence:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

/**
 * DELETE /api/evidence/:id
 * Delete evidence
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
        'DELETE FROM evidence WHERE id = $1 RETURNING id',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Evidence not found' });
      }

      res.json({ message: 'Evidence deleted successfully' });
    } catch (error) {
      console.error('Error deleting evidence:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default router;
