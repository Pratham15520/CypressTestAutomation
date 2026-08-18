
beforeEach(() => {
  cy.env(["herokuAppUrl"]).then(({ herokuAppUrl }) => {
    cy.visit(`${herokuAppUrl}javascript_alerts`);
  });
});

describe("alerts Test", () => {
  it("alertsTest", () => {
    cy.get('button[onclick = "jsAlert()"]').click();
    cy.on("window:alert", ($message) => {
      expect($message).to.equal("I am a JS Alert");
    });
    cy.on("window:confirm", () => true);
    cy.get("#result").should("have.text", "You successfully clicked an alert");
  });

  it("JS Confirm test", () => {
    cy.get('button[onclick = "jsConfirm()"]').click();
    cy.on("window:confirm", ($message) => {
      expect($message).to.equal("I am a JS Confirm");
    });
    cy.on("window:confirm", () => true);
    cy.get("p#result").should("have.text", "You clicked: Ok");
  });

  it('JS Confirm2',()=>{
    cy.get('button[onclick = "jsConfirm()"]').click();
    cy.on("window:confirm", () => false);
    cy.get("p#result").should("have.text", "You clicked: Cancel");
  });

  it('JS prompt box',()=>{
    cy.window().then((window) => {
        cy.stub(window, "prompt").returns("Entering Prompt value");
        cy.contains("button","Click for JS Prompt").click();
        cy.get("p#result").should("have.text", "You entered: Entering Prompt value");
    })
  })


});
