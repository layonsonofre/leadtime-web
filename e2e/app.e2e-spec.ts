import { LeadtimeWebPage } from './app.po';

describe('leadtime-web App', function() {
  let page: LeadtimeWebPage;

  beforeEach(() => {
    page = new LeadtimeWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
