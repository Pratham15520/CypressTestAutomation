import 'cypress-iframe'

describe('Iframes Test', () => {
    it('iFrames Test', () => {
        cy.env(['webDriverUniversity']).then(({ webDriverUniversity }) => {
            cy.visit(`${webDriverUniversity}IFrame/index.html`);

            cy.frameLoaded('#frame');
            cy.iframe().find('#nav-title').should('contain.text', 'WebdriverUniversity.com (Page Object');

            cy.iframe().contains('Contact Us').click();
            cy.wait(2000);
            cy.iframe().find('h2').should('contain.text', 'CONTACT US');
        });
    });
});