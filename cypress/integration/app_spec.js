describe("Homepage", () => {
  it("should display login button when unauthenticated", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.removeItem("access_token");
      }
    });
    cy.visit("/");
    cy.getByText("Login with Github").should("exist");
  });

  it("should display dashboard when authenticated", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          "access_token",
          Cypress.env("GITHUB_ACCESS_TOKEN")
        );
      }
    });
    cy.getByText("Dashboard").should("exist");
    cy.getByText("react").should("exist");
    cy.getByText("vue").should("exist");
    cy.getByText("angular").should("exist");
  });

  it("should navigate to Stargazers screen when View Stargazers is clicked", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          "access_token",
          Cypress.env("GITHUB_ACCESS_TOKEN")
        );
      }
    });
    cy.getByTestId("view-react").click();
    cy.location("pathname").should("equal", "/facebook/react");

    let docRect;
    cy.document().then(doc => {
      docRect = doc.documentElement.getBoundingClientRect();
    });

    cy.queryByTestId("user-card-0-0").should("exist");
    cy.scrollTo("bottom", { duration: 1500 });
    cy.queryByTestId("user-card-0-0").should("not.exist");
    cy.document().then(doc => {
      const newDocRect = doc.documentElement.getBoundingClientRect();
      assert.isAbove(
        newDocRect.height,
        docRect.height,
        "Infinite scroll increases document height"
      );
    });
  });

  it("should allow logout", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          "access_token",
          Cypress.env("GITHUB_ACCESS_TOKEN")
        );
      }
    });
    cy.getByText("Logout").click();
    cy.location("pathname").should("equal", "/");
  });
});
