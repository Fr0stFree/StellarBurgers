describe('can visit app pages', () => {
  it('the main page should be available', () => {
    cy.visit('/');
    cy.contains(/Соберите бургер/i);
  });

  it('feed page should be available', () => {
    cy.visit('/feed');
    cy.contains(/Лента заказов/i);
  });

  it('login page should be available', () => {
    cy.visit('/login');
    cy.contains(/Вход/i);
  });
});
