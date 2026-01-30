import { test, expect } from '@playwright/test';
import { marketDataSteps } from '../src/steps/marketData.js';
import { navigationSteps } from '../src/steps/navigation.js';
import * as utils from '../support/utils';


test.describe('Market data Test Suite', () => {

test('Export market data for columns Low, High, Last, Weight Avg with fixed Hours column to CSV', async ({ page }) => {
  const steps = new marketDataSteps(page);
  const navSteps = new navigationSteps(page);
   const columnCount = 4;
  const outputFile = 'output/market-data.csv';

  // Navigate to EPEX market results page
  await navSteps.navigateToEpex();
 
  // Getting Fixed column data
  const fixedHeader = await steps.getFixedColumnHeader();
  const fixedRows = await steps.getFixedColumnRows();

  // Getting Table data for first 4 columns
  const tableHeaders = await steps.getTableHeaders(4);
  const tableRows = await steps.getTableRows(columnCount);

  // Merge both fixed column and table data
  const finalHeaders = [fixedHeader, ...tableHeaders];
  const finalRows = utils.mergeFixedColumnWithTable(fixedRows, tableRows);

  // Validating the data
  expect(finalHeaders.length).toBe(columnCount + 1);
  expect(finalRows.length).toBeGreaterThan(0);

  // Saving data to CSV
 utils.saveDataToCSV(finalHeaders, finalRows, outputFile);
 
});
});
