/// <reference types="cypress" />
describe("Fluxo de login", () => {
  it("deve fazer login", () => {
    cy.visit("/entrar");

    cy.get("input[name='username']").type("enricksantos");
    cy.get("input[name='password']").type("123456");

    cy.get("button").contains("Entrar").click();

    cy.url().should("include", "/clientes");
  });
});
