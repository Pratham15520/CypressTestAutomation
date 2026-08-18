before(()=>{
    cy.env(['webDriverUniversity']).then(({webDriverUniversity})=>{
        cy.visit(`${webDriverUniversity}Actions/index.html`)
    })
})

describe('Double Click BG Test', () => {
    it('Double click test', () => {
       cy.get('#double-click').should('have.css','background-color','rgb(31, 31, 31)')
       .dblclick().should('have.css','background-color','rgba(16, 185, 129, 0.08)'); 
    });
});