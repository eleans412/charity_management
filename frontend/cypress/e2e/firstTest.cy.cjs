/* eslint-disable no-undef */
describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/');

    cy.get('h1').should('contain', 'Charity Management');
  });
});
