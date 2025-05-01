import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DialogClient from "./dialog-client";

vi.mock("../context/auth", () => ({
  useAuth: () => ({ userID: 1 }),
}));

vi.mock("../hooks/client/useCreateClient", () => ({
  useCreateClient: () => ({
    mutate: (_data: unknown, options: { onSuccess?: VoidFunction }) => {
      if (options.onSuccess) {
        options.onSuccess();
      }
    },
    isPending: false,
  }),
}));
vi.mock("../hooks/client/useUpdateClient", () => ({
  useUpdateClient: () => ({
    mutate: (_data: unknown, options: { onSuccess?: VoidFunction }) => {
      if (options.onSuccess) {
        options.onSuccess();
      }
    },
    isPending: false,
  }),
}));
vi.mock("../hooks/client/useRemoveClient", () => ({
  useRemoveClient: () => ({
    mutate: (_id: number, options: { onSuccess?: VoidFunction }) => {
      if (options.onSuccess) {
        options.onSuccess();
      }
    },
    isPending: false,
  }),
}));

describe("DialogClient - add", () => {
  it("irá abrir o dialog e tomar a ação 'Criar cliente'", async () => {
    const onSuccessActionMock = vi.fn();
    render(
      <DialogClient variant="add" onSuccessAction={onSuccessActionMock}>
        <button>Abrir dialog</button>
      </DialogClient>,
    );

    fireEvent.click(screen.getByText("Abrir dialog"));
    const title = await screen.findByText("Criar cliente:");
    expect(title).toBeInTheDocument();
    const closeButton = screen.getByText("Fechar");
    expect(closeButton).toBeInTheDocument();

    const submitButton = screen.getByText("Criar cliente");
    fireEvent.click(submitButton);

    expect(onSuccessActionMock).toHaveBeenCalled();
  });
});

describe("DialogClient - edit", () => {
  it("irá abrir o dialog e tomar a ação 'Editar cliente'", async () => {
    const onSuccessActionMock = vi.fn();
    render(
      <DialogClient
        variant="edit"
        client={{
          id: 1,
          name: "Cliente",
          companyValue: 1000,
          salary: 5000,
          selected: false,
          createdAt: new Date("2023-10-01T00:00:00Z"),
          updatedAt: new Date("2023-10-01T00:00:00Z"),
          userID: 1,
        }}
        onSuccessAction={onSuccessActionMock}
      >
        <button>Abrir dialog</button>
      </DialogClient>,
    );

    fireEvent.click(screen.getByText("Abrir dialog"));
    const title = await screen.findByText("Editar cliente:");
    expect(title).toBeInTheDocument();
    const closeButton = screen.getByText("Fechar");
    expect(closeButton).toBeInTheDocument();

    const submitButton = screen.getByText("Editar cliente");
    fireEvent.click(submitButton);

    expect(onSuccessActionMock).toHaveBeenCalled();
  });
});

describe("DialogClient - remove", () => {
  it("irá abrir o dialog e tomar a ação 'Excluir cliente'", async () => {
    const onSuccessActionMock = vi.fn();
    render(
      <DialogClient
        variant="remove"
        client={{
          id: 1,
          name: "Cliente",
          companyValue: 1000,
          salary: 5000,
          selected: false,
          createdAt: new Date("2023-10-01T00:00:00Z"),
          updatedAt: new Date("2023-10-01T00:00:00Z"),
          userID: 1,
        }}
        onSuccessAction={onSuccessActionMock}
      >
        <button>Abrir dialog</button>
      </DialogClient>,
    );

    fireEvent.click(screen.getByText("Abrir dialog"));
    const title = await screen.findByText("Remover cliente:");
    expect(title).toBeInTheDocument();
    const closeButton = screen.getByText("Fechar");
    expect(closeButton).toBeInTheDocument();

    const submitButton = screen.getByText("Excluir cliente");
    fireEvent.click(submitButton);

    expect(onSuccessActionMock).toHaveBeenCalled();
  });
});
