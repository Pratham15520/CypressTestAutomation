
describe('File Upload', () => {
    it('File Upload Test', () => {
        cy.env(['webDriverUniversity']).then(({ webDriverUniversity })=>{
            cy.visit(`${webDriverUniversity}File-Upload/index.html`);
            cy.get('#myFile').attachFile('uploadFiles/EHIC.jpg');
            cy.get('#submit-button').click();
        })
    });

    it.only('Upload Test Verification',()=>{
        cy.env(['demoQAUrl']).then(({ demoQAUrl })=>{
            cy.visit(`${demoQAUrl}upload-download`);
            cy.get('#uploadFile').attachFile('uploadFiles/EHIC.jpg');
// Comes from the Cypress plugin cypress-file-upload
// Commonly used for older/custom file input workflows
            cy.get('p#uploadedFilePath').should('include.text','EHIC.jpg');
            cy.get('#uploadFile').selectFile('cypress/fixtures/uploadFiles/PRC.jpeg');
            // Built into Cypress itself
            // More modern and recommended
            // Uses Cypress’s native file upload API

            // use attachFile for plugin-based upload handling
            // use selectFile for standard Cypress file uploads
        });
    })
});