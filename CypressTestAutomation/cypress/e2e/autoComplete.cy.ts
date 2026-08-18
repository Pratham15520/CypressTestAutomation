before(()=>{
    cy.env(['webDriverUniversity']).then(({webDriverUniversity})=>{
        cy.visit(`${webDriverUniversity}Autocomplete-TextField/autocomplete-textfield.html`);
    })
})

const itemName = "Barley";

describe('AutoComplete Testing', () => {
    it('autoComplete test', () => {
        cy.get('#myInput').type(itemName.slice(0, 3));
        cy.get('#myInputautocomplete-list').should('be.visible');
        cy.get('#myInputautocomplete-list div').each(($e1) => {
            const text = $e1.text().trim();
            if (text === itemName) {
                cy.wrap($e1).click();
            }
        })
         cy.get('#myInput').should('have.value', itemName);


    });
});