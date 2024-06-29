describe('can visit the app', () => {
  it('should be available on base url', () => {
    cy.visit('/');
  });
});
