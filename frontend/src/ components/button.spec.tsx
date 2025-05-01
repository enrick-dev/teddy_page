import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Button } from "./button";

vi.mock("../assets/LineMdLoadingLoop", () => ({
  LineMdLoadingLoop: () => (
    <div data-testid="loading-spinner">Carregando...</div>
  ),
}));

describe("Button", () => {
  it("renderiza o botão com o texto quando não está carregando", () => {
    render(<Button>Botão teste</Button>);

    expect(screen.getByText("Botão teste"));
  });

  it("desabilita e mostra o spinner quando isLoading é verdadeiro", () => {
    render(<Button isLoading>Botão carregando</Button>);

    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.queryByText("Test Button")).not.toBeInTheDocument();
  });
});
