/**
 * Show argument details command
 */

import axios from 'axios';
import chalk from 'chalk';
import ora from 'ora';
import { config } from '../config';

interface ShowOptions {
  json?: boolean;
}

export async function showArgument(
  id: string,
  options: ShowOptions
): Promise<void> {
  const spinner = ora('Fetching argument...').start();

  try {
    const response = await axios.get(`${config.apiUrl}/api/arguments/${id}`, {
      timeout: config.apiTimeout,
    });

    spinner.succeed('Argument loaded');

    const arg = response.data;

    if (options.json) {
      console.log(JSON.stringify(arg, null, 2));
      return;
    }

    // Display formatted output
    console.log('\n' + chalk.bold.cyan('═'.repeat(80)));
    console.log(chalk.bold.white(arg.title));
    console.log(chalk.bold.cyan('═'.repeat(80)));

    console.log('\n' + chalk.gray(arg.description));

    // Truth Score
    const score = arg.calculated_truth_score || 0.5;
    const scorePercent = (score * 100).toFixed(0) + '%';
    const scoreColor =
      score >= 0.7 ? chalk.green : score <= 0.3 ? chalk.red : chalk.yellow;

    console.log('\n' + chalk.bold('Truth Score: ') + scoreColor.bold(scorePercent));

    // Progress bar
    const barLength = 40;
    const filled = Math.round(score * barLength);
    const bar =
      scoreColor('█'.repeat(filled)) + chalk.gray('░'.repeat(barLength - filled));
    console.log(bar);

    // Evidence
    console.log('\n' + chalk.bold.yellow(`📚 Evidence (${arg.evidence?.length || 0})`));
    if (arg.evidence && arg.evidence.length > 0) {
      for (const evidence of arg.evidence) {
        console.log(
          chalk.cyan('  •') +
            ' ' +
            evidence.description.substring(0, 60) +
            (evidence.description.length > 60 ? '...' : '')
        );
        console.log(
          chalk.gray(`    Source: ${evidence.source} | Truth: ${(evidence.truth_score * 100).toFixed(0)}%`)
        );
      }
    } else {
      console.log(chalk.gray('  No evidence added yet'));
    }

    // Supporting Arguments
    console.log(
      '\n' +
        chalk.bold.green(
          `✅ Supporting Arguments (${arg.supportingArguments?.length || 0})`
        )
    );
    if (arg.supportingArguments && arg.supportingArguments.length > 0) {
      for (const link of arg.supportingArguments) {
        console.log(chalk.green('  •') + ' ' + link.sub_argument_title);
        console.log(
          chalk.gray(
            `    Linkage: ${(link.linkage_score * 100).toFixed(0)}% | Importance: ${(link.importance_weight * 100).toFixed(0)}%`
          )
        );
      }
    } else {
      console.log(chalk.gray('  No supporting arguments'));
    }

    // Opposing Arguments
    console.log(
      '\n' +
        chalk.bold.red(
          `❌ Opposing Arguments (${arg.opposingArguments?.length || 0})`
        )
    );
    if (arg.opposingArguments && arg.opposingArguments.length > 0) {
      for (const link of arg.opposingArguments) {
        console.log(chalk.red('  •') + ' ' + link.sub_argument_title);
        console.log(
          chalk.gray(
            `    Linkage: ${Math.abs(link.linkage_score * 100).toFixed(0)}% | Importance: ${(link.importance_weight * 100).toFixed(0)}%`
          )
        );
      }
    } else {
      console.log(chalk.gray('  No opposing arguments'));
    }

    console.log('\n' + chalk.bold.cyan('═'.repeat(80)) + '\n');
  } catch (error: any) {
    spinner.fail('Failed to fetch argument');

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
