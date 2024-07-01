import '@4tw/cypress-drag-drop';

describe('can make an order', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('the page should contain the text "Соберите бургер"', () => {
    cy.contains('Соберите бургер');
  });

  it('should drag and drop ingredients to the constructor', () => {
    cy.get('section[class^="styles_burger_constructor"]').should('be.visible').as('dropzone');

    cy.get('div').contains(/Краторная булка N-200i/i).drag('@dropzone');
    cy.get('div.tab').contains(/Начинки/i).click().then(() => {
      cy.get('div').contains(/Биокотлета из марсианской Магнолии/i).drag('@dropzone');
    });
    cy.get('div.tab').contains(/Соусы/i).click().then(() => {
      cy.get('div').contains(/Соус Spicy-X/i).drag('@dropzone');
    });
    cy.get('@dropzone').find('div.constructor-element').should('have.length', 4).each(($el, index) => {
      const ingredients = [
        'Краторная булка N-200i (верх)',
        'Биокотлета из марсианской Магнолии',
        'Соус Spicy-X',
        'Краторная булка N-200i (низ)',
      ];
      expect($el.text()).to.contains(ingredients[index]);
    });
    cy.get('button').contains(/Оформить заказ/i).should('be.enabled').click();
    cy.url().should('include', '/login');
  });
});
