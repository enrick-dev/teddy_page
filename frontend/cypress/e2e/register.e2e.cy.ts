/// <reference types="cypress" />
describe("Fluxo de Cadastro", () => {
  it("deve fazer cadastro e ser redirecionado para /clientes", () => {
    cy.visit("/entrar");

    cy.get("a").contains("Crie aqui").click();

    cy.url().should("include", "/cadastro");

    cy.get("input[name='firstName']").type("Enrick");
    cy.get("input[name='lastName']").type("Santos");
    cy.get("input[name='username']").type("enricksantosteste");
    cy.get("input[name='password']").type("123456");

    cy.get("button").contains("Criar conta").click();

    cy.url().should("include", "/clientes");
  });
});
