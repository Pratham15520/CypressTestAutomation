describe('Hover', () => {
    it('Mouse hover Test', () => {
    
        cy.visit(`${Cypress.expose('webDriverUniversity')}/Actions/index.html`);
        cy.contains('button','Hover Over Me Second!').invoke('mouseover').click();
        // invoke('mouseover') tells Cypress to fire the browser/jQuery mouseover event on the element.
        cy.contains('a','Link 1').should('have.text','Link 1').click({force: true});
    });
    // on('mouseover', handler) = listen for the event
    // invoke('mouseover') = trigger/fire the event
});