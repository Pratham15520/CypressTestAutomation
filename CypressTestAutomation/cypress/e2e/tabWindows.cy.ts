before(() => {
  cy.env(["bondarAcademyUrl"]).then(({ bondarAcademyUrl }) => {
    cy.visit(`${bondarAcademyUrl}`);
    cy.contains("Modal & Overlays").click();
  });
});

describe("Windows Tabs Suite", {defaultCommandTimeout:6000}, () => {
  it("Windows TC", () => {
    cy.contains("Window").click();
    cy.url({ timeout: 6000 }).then((url) => {
      expect(url).to.equal(
        "https://www.playground.bondaracademy.com/pages/modal-overlays/window",
      );
    });

    cy.window().then((win) => {
      cy.stub(win, "open").as("open");
    });

    cy.contains("button", "Open homepage in a new tab").click();
    cy.get("@open").should("have.been.calledOnce");

    cy.get("@open",{timeout:3000}).then((stub) => {
      const url = stub.getCall(0).args[0];
      expect(url).to.equal("http://www.playground.bondaracademy.com");
    });
    // cy.get('@open')
    // retrieves the alias for the stubbed window.open function created earlier.
    // this gives you the Sinon stub object.
    // .then((stub) => { ... })
    // runs a callback with that stub once it is available.

    // stub.getCall(0) gets the first time window.open was called.
    // .args[0] reads the first argument passed to that call.
    // for window.open(url, ...), the first argument is the URL.
  });
});
// No — `cy.stub(win, "open")` is not the same as `window.open()`.

// - `window.open()` is the real browser API that opens a new tab/window.
// - `cy.stub(win, "open")` replaces the `open` method on that window object with a Sinon stub.

// So after stubbing:
// - calling `win.open(...)` does not actually open a new tab
// - it records the call and arguments
// - you can assert on `stub.getCall(0).args[0]`

// In your test, `cy.stub(win, "open").as("open")` means:
// - you are intercepting the browser’s `window.open`
// - the button click can still call `window.open(...)`
// - but Cypress prevents the actual new window/tab from opening
// - then you inspect the stub to verify the URL that it tried to open

// That’s why this is useful for testing link behavior without leaving the app under test.