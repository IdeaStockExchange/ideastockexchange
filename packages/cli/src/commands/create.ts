/**
 * Create argument command
 */

import axios from 'axios';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import { config } from '../config';

interface CreateOptions {
  title?: string;
  description?: string;
}

export async function createArgument(options: CreateOptions): Promise<void> {
  let title = options.title;
  let description = options.description;

  // Interactive prompts if not provided
  if (!title || !description) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Argument title:',
        when: !title,
        validate: (input) =>
          input.length >= 10 || 'Title must be at least 10 characters',
      },
      {
        type: 'editor',
        name: 'description',
        message: 'Argument description (will open your default editor):',
        when: !description,
        validate: (input) =>
          input.length >= 20 || 'Description must be at least 20 characters',
      },
    ]);

    title = title || answers.title;
    description = description || answers.description;
  }

  const spinner = ora('Creating argument...').start();

  try {
    const response = await axios.post(
      `${config.apiUrl}/api/arguments`,
      {
        title,
        description,
      },
      {
        timeout: config.apiTimeout,
      }
    );

    spinner.succeed('Argument created successfully!');

    const arg = response.data;

    console.log('\n' + chalk.bold.green('✓ Created:'));
    console.log(chalk.gray('  ID: ') + chalk.white(arg.id));
    console.log(chalk.gray('  Title: ') + chalk.white(arg.title));

    console.log(
      '\n' +
        chalk.cyan('View your argument: ') +
        chalk.white(`reasonrank show ${arg.id}\n`)
    );
  } catch (error: any) {
    spinner.fail('Failed to create argument');

    if (error.code === 'ECONNREFUSED') {
      console.error(
        chalk.red('\nError: Could not connect to API server at ' + config.apiUrl)
      );
      console.log(chalk.yellow('Make sure the API server is running.\n'));
    } else {
      console.error(
        chalk.red('\nError: ' + (error.response?.data?.error || error.message))
      );
    }

    process.exit(1);
  }
}
