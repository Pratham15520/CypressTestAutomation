

const login = () => {
  cy.env(["sauceDemoUrl"]).then(({ sauceDemoUrl }) => {
    cy.visit(`${sauceDemoUrl}`);
  });
  cy.get("input#user-name").type("standard_user");
  cy.get("input#password").type("secret_sauce");
  cy.get("#login-button").click();
};

describe("First Login Test", () => {
  beforeEach(() => {
    cy.session("Session_Login", login);
  });

  it("validLogin1", () => {
    cy.env(["sauceDemoUrl"]).then(({ sauceDemoUrl }) => {
      cy.visit(`${sauceDemoUrl}`);
    });
  });

  it("validLogin2", () => {
    cy.env(["sauceDemoUrl"]).then(({ sauceDemoUrl }) => {
      cy.visit(`${sauceDemoUrl}`);
    });
  });
});
