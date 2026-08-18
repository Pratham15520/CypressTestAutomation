
describe("Navigation Test", () => {
  before(() => {
    cy.env(["webDriverUniversity"]).then(({ webDriverUniversity }) => {
      cy.visit(`${webDriverUniversity}`);
    });
  });

  it("navigation test", () => {
    cy.get("#to-do-list").invoke("removeAttr", "target").click();
    cy.url().then((url) => {
      expect(url).to.be.equal(
        "https://www.webdriveruniversity.com/To-Do-List/index.html",
      );
    });
    cy.go("back", {'timeout':2000});
    cy.url().should('contain','https://www.webdriveruniversity.com/');
  });
});
