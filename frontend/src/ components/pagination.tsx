import React from "react";

interface PropsFooter {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PropsFooter> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = (function (): (number | string)[] {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (totalPages == 6) {
      return [1, 2, 3, 4, 5, totalPages];
    }

    if (currentPage < 5) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 4) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  })();
  return (
    <div className="flex gap-1">
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`cursor-pointer rounded px-3.5 py-1.5 font-bold ${currentPage === page ? "bg-primary text-secondary" : "text-secondary-foreground"}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
