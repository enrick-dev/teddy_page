/// <reference types="cypress" />
describe("Fluxo completo: Login, criar, editar e remover cliente", () => {
  it("deve fazer login, criar um cliente, editar e remover", () => {
    cy.visit("/entrar");

    cy.get("input[name='username']").type("enricksantos");
    cy.get("input[name='password']").type("123456");

    cy.get("button").contains("Entrar").click();

    cy.url().should("include", "/clientes");

    // Criar um cliente
    cy.get("button").contains("Criar cliente").click();

    cy.get("input[name='clientName']").type("Cliente Teste");
    cy.get("input[name='clientSalary']").type("5000");
    cy.get("input[name='clientCompanyValue']").type("1000");

    cy.get("button[name=btnAddClient]").click();

    cy.contains("Cliente Teste").should("be.visible");

    // Editar o cliente
    cy.get("div[aria-label='edit']").click({ force: true });
    cy.get("input[name='clientName']").clear().type("Cliente Teste Atualizado");
    cy.get("input[name='clientSalary']").clear().type("35000");
    cy.get("input[name='clientCompanyValue']").clear().type("2200");

    cy.get("button[name=btnEditClient]").click();

    cy.contains("Cliente Teste Atualizado").should("be.visible");

    // Remover o cliente
    cy.get("div[aria-label='remove']").click({ force: true });
    cy.get("button[name=btnRemoveClient]").click();

    cy.contains("Cliente Teste Atualizado").should("not.exist");
  });
});
