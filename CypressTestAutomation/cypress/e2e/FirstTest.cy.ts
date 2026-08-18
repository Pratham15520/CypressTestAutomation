
beforeEach(()=>{
    cy.visit(Cypress.expose('sauceDemoUrl'));
})

describe('My First Test', () => {
    it('Visit Home Page',()=>{
        cy.contains('Swag Labs').should('be.visible');
    });

    it('Verify URL',()=>{
        cy.url().then((url)=>{
            expect(url).to.equal('https://www.saucedemo.com/');
        })
    });

    it('Verify Title',{'defaultCommandTimeout':3000},()=>{
        cy.title().then((title)=>{
            expect(title).to.be.equal("Swag Labs");
        })
    });
})