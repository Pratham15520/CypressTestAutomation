before(()=>{
    cy.env(['webDriverUniversity']).then(({webDriverUniversity})=>{
        cy.visit(`${webDriverUniversity}Accordion/index.html`);
    })
})

describe('Accordian Test Suite', () => {
    it('accordianTest', () => {
        cy.get('#manual-testing-accordion').click().should('have.class','accordion active');
        cy.get('#manual-testing-accordion').next().next().should('have.class','accordion');
    });
});