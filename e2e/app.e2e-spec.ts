import { CribtoolPage } from './app.po';

describe('cribtool App', function() {
  let page: CribtoolPage;

  beforeEach(() => {
    page = new CribtoolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
