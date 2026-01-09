/**
 * CLI configuration
 */

export const config = {
  apiUrl: process.env.API_URL || 'http://localhost:3001',
  apiTimeout: 10000,
};

export function setApiUrl(url: string): void {
  config.apiUrl = url;
}
