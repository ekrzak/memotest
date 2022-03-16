/// <reference types="Cypress" />

const URL = 'http://127.0.0.1:8080/';
const CELLS_NUMBER = 12;

context('Memotest', () => {

    before(() => {
        cy.visit(URL);
    });

    describe('Plays the game', () => {

        it('makes sure there is a board with cells', () => {
            cy.get('#board').get('.cell').should('have.length', CELLS_NUMBER);
        });

    });

});
