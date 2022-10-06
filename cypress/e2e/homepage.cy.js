describe("Homepage", () => {
  it("render news from RSS feed", () => {
    cy.visit("http://localhost:3001/");

    cy.get("[data-testid=card-body]").should("be.visible");
    cy.get("[data-testid=card-body]").first().click();
    cy.url().should("include", "/detail/");
  });

  it("save news to fav", () => {
    cy.visit("http://localhost:3001/");
    cy.get('[alt="open menu"]').click();

    cy.contains("Favoritos").click();
    cy.contains("Oops! Parece que no tienes favoritos¯\\_(ツ)_/¯");

    cy.contains("Home").click();
    cy.get("[data-testid=card-favorite-button]").first().click();

    cy.contains("Favoritos").click();
    cy.contains("Oops! Parece que no tienes favoritos¯\\_(ツ)_/¯").should(
      "not.exist"
    );
  });
});
