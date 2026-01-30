import fs from 'fs';
import path from 'path';
import { marketDataLocators } from '../locators/marketData.js';

export class marketDataSteps {
  constructor(page) {
    this.page = page;
  }

  async getFixedColumnHeader() {
    await this.page.waitForSelector(marketDataLocators.fixedHeader);
    return this.page.$eval(
      marketDataLocators.fixedHeader,
      el => el.innerText
    );
  }

  async getFixedColumnRows() {
    await this.page.waitForSelector(marketDataLocators.fixedRows);
    return this.page.$$eval(
      marketDataLocators.fixedRows,
      els =>
        els.map(el => el.innerText) // no trim, exact text
    );
  }

  async getTableHeaders(columnCount = 4) {
    return this.page.$$eval(
      marketDataLocators.tableHeaders,
      (ths, count) =>
        Array.from(ths)
          .slice(0, count)
          .map(th => th.innerText.replace(/\r?\n|\r/g, ' ')),
      columnCount
    );
  }

  async getTableRows(columnCount = 4) {
    return this.page.$$eval(
      marketDataLocators.tableRows,
      (trs, count) =>
        Array.from(trs).map(tr =>
          Array.from(tr.querySelectorAll('td'))
            .slice(0, count)
            .map(td => td.innerText)
        ),
      columnCount
    );
  }



  
}
