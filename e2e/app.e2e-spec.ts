import { NgxFacebookPage } from './app.po';

describe('ngx-facebook App', () => {
  let page: NgxFacebookPage;

  beforeEach(() => {
    page = new NgxFacebookPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
