import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Pagination from "./pagination";

describe("Pagination", () => {
  it("renderiza todas as paginas quando o totalPages <= 5", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={2} totalPages={4} onPageChange={onPageChange} />,
    );
  });

  it("renderiza paginação com '...' qiuando o currentPage está no início", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={onPageChange}
      />,
    );

    [1, 2, 3, 4, 5, 10].forEach((page) => {
      expect(screen.getByText(page.toString())).toBeInTheDocument();
    });

    expect(screen.getByText("...")).toBeInTheDocument();
  });

  it("renderiza paginação com '...' qiuando currentPage está no final", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={9}
        totalPages={10}
        onPageChange={onPageChange}
      />,
    );

    [1, 6, 7, 8, 9, 10].forEach((item) => {
      expect(screen.getByText(item.toString())).toBeInTheDocument();
    });
    expect(screen.getByText("...")).toBeInTheDocument();
  });

  it("renderiza paginação com '...' qiuando currentPage está no meio", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={onPageChange}
      />,
    );

    [1, 4, 5, 6, 10].forEach((item) => {
      expect(screen.getByText(item.toString())).toBeInTheDocument();
    });
    const threePoints = screen.getAllByText("...");
    expect(threePoints.length).toBe(2);
  });

  it("chama onPageChange ao clicar em um número de página", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={3} totalPages={7} onPageChange={onPageChange} />,
    );

    const page2Button = screen.getByText("2");
    fireEvent.click(page2Button);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("não chama onPageChange quando clicado no '...'", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={4}
        totalPages={10}
        onPageChange={onPageChange}
      />,
    );

    const threePoints = screen.getByText("...");
    fireEvent.click(threePoints);

    expect(onPageChange).not.toHaveBeenCalled();
  });
});
