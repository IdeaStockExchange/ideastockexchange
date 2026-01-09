/**
 * Import data command
 */

import chalk from 'chalk';

interface ImportOptions {
  merge?: boolean;
}

export async function importData(
  file: string,
  options: ImportOptions
): Promise<void> {
  console.log(chalk.yellow('\nData import not yet implemented.\n'));
  console.log(chalk.gray(`Will import from: ${file}`));
  console.log(chalk.gray(`Merge mode: ${options.merge ? 'Yes' : 'No'}\n`));
}
