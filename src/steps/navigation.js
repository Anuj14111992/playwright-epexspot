export class navigationSteps {
  constructor(page) {
    this.page = page;
  }
async navigateToEpex() {
    await this.page.goto('https://www.epexspot.com/en/market-results?market_area=GB&auction=&trading_date=&delivery_date=2026-01-25&underlying_year=&modality=Continuous&sub_modality=&technology=&data_mode=table&period=&production_period=&product=30');
  }
  }