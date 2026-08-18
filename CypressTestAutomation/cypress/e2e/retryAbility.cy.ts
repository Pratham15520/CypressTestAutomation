before(() => {
    // cy.visit(`${Cypress.expose('webDriverUniversity')}Accordion/index.html`);
    cy.env(["webDriverUniversity"]).then(({ webDriverUniversity }) => {
      cy.visit(`${webDriverUniversity}Accordion/index.html`);
    });
});

describe('Retry Scenarios', () => {
    it('Retry Functional cases', {defaultCommandTimeout:15000}, () => {
        cy.get('#text-appear-box').find('#hidden-text').then((textVal)=>{
            if (cy.wrap(textVal).contains('LOADING COMPLETE.')){
                cy.get('#click-accordion').click();
                cy.get('#timeout').click().should('have.text','This text has appeared after 5 seconds!');
            }
        })
    });
});