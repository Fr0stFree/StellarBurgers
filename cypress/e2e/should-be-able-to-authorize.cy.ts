describe('can authorize', () => {
  it("should be able to login and logout", () => {
    // login form checks
    cy.visit('/login');
    cy.get('input[name="email"]').should('be.visible').should('be.enabled').as('email');
    cy.get('input[name="password"]').should('be.visible').should('be.enabled').as('password');
    cy.get('button[type="submit"]').should('be.visible').should('be.enabled').as('submit');

    // login
    cy.get('@email').type(Cypress.env('USER_EMAIL'));
    cy.get('@password').type(Cypress.env('USER_PASSWORD'));
    cy.get('@submit').click();
    cy.intercept('POST', '/api/auth/login').as('login');
    cy.wait('@login').its('response.statusCode').should('eq', 200);
    cy.window().its('localStorage').invoke('getItem', 'refreshToken').should('not.be.null');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);

    // logout
    cy.visit('/profile');
    cy.get('a').contains(/Выход/i).should('be.visible').click();
    cy.intercept('POST', '/api/auth/logout').as('logout');
    cy.wait('@logout').its('response.statusCode').should('eq', 200);
    cy.window().its('localStorage').invoke('getItem', 'refreshToken').should('be.null');
    cy.url().should('eq', `${Cypress.config().baseUrl}/login`);
  });
});