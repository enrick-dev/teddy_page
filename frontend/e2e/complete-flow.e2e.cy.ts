/// <reference types="cypress" />
describe("Fluxo completo: Login, criar, editar e remover cliente", () => {
  it("deve fazer login, criar um cliente, editar e remover", () => {
    cy.visit("/entrar");

    cy.get("input[name='username']").type("enricksantos");
    cy.get("input[name='password']").type("123456");

    cy.get("button").contains("Entrar").click();

    cy.url().should("include", "/clientes");

    // ----- Criar um cliente -----
    // Supondo que exista um botão "Novo Cliente" para abrir o diálogo de criação
    cy.get("button").contains("Criar cliente").click();

    // Preencha os dados do cliente (ajuste os seletores conforme necessário)
    cy.get("input[name='clientName']").type("Cliente Teste");
    cy.get("input[name='clientSalary']").type("5000");
    cy.get("input[name='clientCompanyValue']").type("1000");

    // Clique para confirmar a criação
    cy.get("button").contains("Criar cliente").click();

    // Verifica se o cliente foi criado e aparece na listagem
    cy.contains("Cliente Teste").should("be.visible");

    // ----- Editar o cliente -----
    // Supondo que cada cliente na listagem tenha um botão "Editar"
    cy.get("button").contains("Editar").click({ force: true });
    // Altere o nome do cliente (se houver um input com name "clientName")
    cy.get("input[name='clientName']").clear().type("Cliente Teste Atualizado");

    // Confirme a edição (ajuste o texto do botão se necessário)
    cy.get("button").contains("Editar cliente").click();

    // Verifique se a alteração foi aplicada
    cy.contains("Cliente Teste Atualizado").should("be.visible");

    // ----- Remover o cliente -----
    // Supondo que exista um botão "Remover" para cada cliente
    cy.get("button").contains("Remover").click({ force: true });
    // Confirme a remoção, por exemplo, clicando em "Confirmar" (ajuste conforme a implementação)
    cy.get("button").contains("Confirmar Remoção").click();

    // Verifica que o cliente foi removido
    cy.contains("Cliente Teste Atualizado").should("not.exist");
  });
});
