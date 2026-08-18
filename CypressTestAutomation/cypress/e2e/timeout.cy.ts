describe('Timeouts', () => {
    it('page load timeout test', () => {
        cy.env(['webDriverUniversity']).then(({webDriverUniversity}) => {
            cy.visit(`${webDriverUniversity}Ajax-Loader/index.html`);  
        })
        cy.get('#button1', {timeout : 120000}).should('be.visible');
    });
});