
before(()=>{
   cy.env(['webDriverUniversity']).then(({webDriverUniversity})=>{
        cy.visit(`${webDriverUniversity}Actions/index.html`);
   }) 
})

describe('Drag and Drop Test',()=>{
    it('dragDropTest',()=>{
        cy.get('#draggable').drag('#droppable', { force: true });
        cy.get('#droppable').find('b').should('have.text', 'Dropped!');
    })
})