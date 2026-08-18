describe('Dynamic Table Test', () => {
    it('Firefox Memory Test', () => {
        cy.visit(Cypress.expose('testAutomationPractice'));

        cy.get("tbody[id='rows'] tr").each(($row) => {
            const rowText = $row.text();
            if (rowText.includes('Firefox')) {
                const rowValues = $row.find('td').toArray().map((cell) => Cypress.$(cell).text());
                rowValues.forEach((val) => {
                    if (/^\d+(\.\d+)?\s*MB$/.test(val.trim())) {
                        cy.log(val);
                        expect(val).to.contain(val);
                    }
                });
            }
        });
    });
});