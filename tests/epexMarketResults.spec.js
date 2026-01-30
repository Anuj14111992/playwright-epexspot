import { test, expect } from '@playwright/test';
import { marketDataSteps } from '../src/steps/marketData.js';
import * as utils from '../support/utils';


test.describe('Market data Test Suite', () => {

test('Export market data for columns Low, High, Last, Weight Avg with fixed Hours column to CSV', async ({ page }) => {
  const steps = new marketDataSteps(page);

  await page.goto('https://www.epexspot.com/en/market-results?market_area=GB&auction=&trading_date=&delivery_date=2026-01-25&underlying_year=&modality=Continuous&sub_modality=&technology=&data_mode=table&period=&production_period=&product=30');

  const columnCount = 4;
  const outputFile = 'output/market-data.csv';

  // Fixed column
  const fixedHeader = await steps.getFixedColumnHeader();
  const fixedRows = await steps.getFixedColumnRows();

  // Table data
  const tableHeaders = await steps.getTableHeaders(4);
  const tableRows = await steps.getTableRows(columnCount);

  // Merge
  const finalHeaders = [fixedHeader, ...tableHeaders];
  const finalRows = utils.mergeFixedColumnWithTable(fixedRows, tableRows);

  // Validations
  expect(finalHeaders.length).toBe(columnCount + 1);
  expect(finalRows.length).toBeGreaterThan(0);

 utils.saveDataToCSV(finalHeaders, finalRows, outputFile);
 
});
});
