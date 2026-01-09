/**
 * Analyze argument command
 */

import axios from 'axios';
import chalk from 'chalk';
import ora from 'ora';
import { config } from '../config';
import { ReasonRankCalculator } from '@ideastockexchange/core';

export async function analyzeArgument(id: string): Promise<void> {
  const spinner = ora('Analyzing argument...').start();

  try {
    const response = await axios.get(`${config.apiUrl}/api/arguments/${id}`, {
      timeout: config.apiTimeout,
    });

    spinner.succeed('Analysis complete');

    const arg = response.data;

    console.log('\n' + chalk.bold.cyan('═'.repeat(80)));
    console.log(chalk.bold.white('ReasonRank Analysis'));
    console.log(chalk.bold.cyan('═'.repeat(80)));

    console.log('\n' + chalk.bold(arg.title));

    // Summary statistics
    console.log('\n' + chalk.bold.yellow('Summary:'));
    console.log(chalk.gray('  Evidence count: ') + arg.evidence?.length || 0);
    console.log(
      chalk.gray('  Supporting arguments: ') +
        (arg.supportingArguments?.length || 0)
    );
    console.log(
      chalk.gray('  Opposing arguments: ') +
        (arg.opposingArguments?.length || 0)
    );

    // Score breakdown
    const score = arg.calculated_truth_score || 0.5;
    const scorePercent = (score * 100).toFixed(0) + '%';
    const scoreColor =
      score >= 0.7 ? chalk.green : score <= 0.3 ? chalk.red : chalk.yellow;

    console.log('\n' + chalk.bold.yellow('Score Breakdown:'));
    console.log(
      chalk.gray('  Overall Truth Score: ') + scoreColor.bold(scorePercent)
    );

    // Evidence contribution
    if (arg.evidence && arg.evidence.length > 0) {
      const avgEvidence =
        arg.evidence.reduce((sum: number, e: any) => sum + e.truth_score, 0) /
        arg.evidence.length;
      console.log(
        chalk.gray('  Average Evidence Score: ') +
          chalk.white(`${(avgEvidence * 100).toFixed(0)}%`)
      );
    }

    // Quality assessment
    console.log('\n' + chalk.bold.yellow('Quality Assessment:'));

    const evidenceCount = arg.evidence?.length || 0;
    const supportCount = arg.supportingArguments?.length || 0;
    const opposeCount = arg.opposingArguments?.length || 0;

    if (evidenceCount === 0) {
      console.log(chalk.red('  ⚠ No evidence provided'));
    } else if (evidenceCount < 3) {
      console.log(chalk.yellow('  ⚠ Limited evidence (consider adding more)'));
    } else {
      console.log(chalk.green('  ✓ Good evidence coverage'));
    }

    if (supportCount === 0 && opposeCount === 0) {
      console.log(chalk.yellow('  ⚠ No sub-arguments linked'));
    } else if (opposeCount === 0) {
      console.log(
        chalk.yellow('  ⚠ No opposing arguments (consider counterarguments)')
      );
    } else {
      console.log(chalk.green('  ✓ Balanced argument structure'));
    }

    // Recommendations
    console.log('\n' + chalk.bold.yellow('Recommendations:'));

    if (evidenceCount < 3) {
      console.log(
        chalk.gray(
          '  • Add more high-quality evidence to strengthen the argument'
        )
      );
    }

    if (opposeCount === 0) {
      console.log(
        chalk.gray(
          '  • Link opposing arguments to show comprehensive analysis'
        )
      );
    }

    if (score < 0.5 && evidenceCount > 0) {
      console.log(
        chalk.gray(
          '  • Review evidence quality - low score despite having evidence'
        )
      );
    }

    console.log('\n' + chalk.bold.cyan('═'.repeat(80)) + '\n');
  } catch (error: any) {
    spinner.fail('Failed to analyze argument');

    if (error.response?.status === 404) {
      console.error(chalk.red('\nError: Argument not found\n'));
    } else if (error.code === 'ECONNREFUSED') {
      console.error(
        chalk.red('\nError: Could not connect to API server at ' + config.apiUrl)
      );
      console.log(chalk.yellow('Make sure the API server is running.\n'));
    } else {
      console.error(
        chalk.red('\nError: ' + (error.message || 'Unknown error'))
      );
    }

    process.exit(1);
  }
}
