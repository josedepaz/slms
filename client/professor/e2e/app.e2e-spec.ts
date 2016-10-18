import { ProfessorPage } from './app.po';

describe('professor App', function() {
  let page: ProfessorPage;

  beforeEach(() => {
    page = new ProfessorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
