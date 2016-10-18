import { StudentPage } from './app.po';

describe('student App', function() {
  let page: StudentPage;

  beforeEach(() => {
    page = new StudentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
