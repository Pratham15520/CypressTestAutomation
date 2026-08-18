describe("JS Alerts", () => {
  beforeEach(() => {
    cy.env(["webDriverUniversity"]).then(({ webDriverUniversity }) => {
      cy.visit(`${webDriverUniversity}Popup-Alerts/index.html`);
    });
  });

  it("alerts test", () => {
    cy.get("#button1").click();
    cy.on("window:alert", ($str) => {
      expect($str).to.be.equal("I am an alert box!");
    });
  });

  it("Confirm alert", () => {
    cy.get("#button4").click();
    cy.on("window:confirm", () => {
      return true;
    });
    cy.get("#confirm-alert-text").should("have.text", "You pressed OK!");
  });

  it("Dismiss alert", () => {
    cy.get("#button4").click();
    cy.on("window:confirm", () => {
      return false;
    });
    cy.get("#confirm-alert-text").should("have.text", "You pressed Cancel!");
  });

  it("Dismiss alert using stub", () => {

    const stub = cy.stub();
    cy.on('window:confirm', stub);

    cy.get("#button4").click().then(() =>{
        expect(stub.getCall(0)).to.be.calledWith('Press a button!')
    }).then(()=>{
        return true;
    }).then(()=>{
        cy.get("#confirm-alert-text").should("have.text", "You pressed OK!");
    })

  });


});
