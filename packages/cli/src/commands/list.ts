/**
 * List arguments command
 */

import axios from 'axios';
import chalk from 'chalk';
import { table } from 'table';
import ora from 'ora';
import { config } from '../config';

interface ListOptions {
  search?: string;
  limit?: string;
}

export async function listArguments(options: ListOptions): Promise<void> {
  const spinner = ora('Fetching arguments...').start();

  try {
    const response = await axios.get(`${config.apiUrl}/api/arguments`, {
      params: {
        search: options.search,
        limit: options.limit ? parseInt(options.limit) : 20,
      },
      timeout: config.apiTimeout,
    });

    spinner.succeed('Arguments loaded');

    const args = response.data.arguments || [];

    if (args.length === 0) {
      console.log(chalk.yellow('\nNo arguments found.\n'));
      return;
    }

    // Create table data
    const tableData = [
      [
        chalk.bold('ID'),
        chalk.bold('Title'),
        chalk.bold('Truth Score'),
        chalk.bold('Evidence'),
      ],
    ];

    for (const arg of args) {
      const score = arg.calculated_truth_score
        ? `${(arg.calculated_truth_score * 100).toFixed(0)}%`
        : 'N/A';

      const scoreColor =
        arg.calculated_truth_score >= 0.7
          ? chalk.green
          : arg.calculated_truth_score <= 0.3
          ? chalk.red
          : chalk.yellow;

      tableData.push([
        chalk.gray(arg.id.substring(0, 8)),
        arg.title.length > 50 ? arg.title.substring(0, 47) + '...' : arg.title,
        scoreColor(score),
        chalk.gray(arg.evidence_count.toString()),
      ]);
    }

    console.log('\n' + table(tableData));

    console.log(
      chalk.gray(`\nShowing ${args.length} of ${response.data.total} arguments\n`)
    );
    console.log(
      chalk.cyan('Use') +
        ' ' +
        chalk.white('reasonrank show <id>') +
        ' ' +
        chalk.cyan('to view details\n')
    );
  } catch (error: any) {
    spinner.fail('Failed to fetch arguments');

    if (error.code === 'ECONNREFUSED') {
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
