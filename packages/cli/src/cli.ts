#!/usr/bin/env node

/**
 * ReasonRank CLI - Developer tools for managing argument data
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { listArguments } from './commands/list';
import { showArgument } from './commands/show';
import { createArgument } from './commands/create';
import { calculateScore } from './commands/calculate';
import { importData } from './commands/import';
import { exportData } from './commands/export';
import { analyzeArgument } from './commands/analyze';

const program = new Command();

program
  .name('reasonrank')
  .description('CLI tools for managing ReasonRank argument data')
  .version('1.0.0');

// List arguments
program
  .command('list')
  .description('List all arguments')
  .option('-s, --search <term>', 'Search for arguments')
  .option('-l, --limit <number>', 'Limit number of results', '20')
  .action(listArguments);

// Show argument details
program
  .command('show <id>')
  .description('Show detailed information about an argument')
  .option('--json', 'Output as JSON')
  .action(showArgument);

// Create new argument
program
  .command('create')
  .description('Create a new argument interactively')
  .option('-t, --title <title>', 'Argument title')
  .option('-d, --description <description>', 'Argument description')
  .action(createArgument);

// Calculate score
program
  .command('calculate <id>')
  .description('Calculate ReasonRank score for an argument')
  .option('--recursive', 'Recalculate all sub-arguments')
  .action(calculateScore);

// Import data
program
  .command('import <file>')
  .description('Import arguments from JSON file')
  .option('--merge', 'Merge with existing data')
  .action(importData);

// Export data
program
  .command('export [file]')
  .description('Export arguments to JSON file')
  .option('-i, --id <id>', 'Export specific argument')
  .option('--all', 'Export all arguments')
  .action(exportData);

// Analyze argument
program
  .command('analyze <id>')
  .description('Analyze argument structure and score breakdown')
  .action(analyzeArgument);

// Parse arguments
program.parse();

// Show help if no command provided
if (!process.argv.slice(2).length) {
  console.log(chalk.cyan.bold('\n  💡 ReasonRank CLI - Developer Tools\n'));
  program.outputHelp();
  console.log(chalk.gray('\n  Examples:'));
  console.log(chalk.gray('    $ reasonrank list'));
  console.log(chalk.gray('    $ reasonrank show <argument-id>'));
  console.log(chalk.gray('    $ reasonrank create'));
  console.log(chalk.gray('    $ reasonrank analyze <argument-id>\n'));
}
