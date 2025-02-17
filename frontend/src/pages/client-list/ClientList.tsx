import React, { useEffect } from "react";
import { Button } from "../../ components/button";
import CardClient from "../../ components/card-client";
import { Client, useFetchClient } from "../../hooks/client/useFetchClient";

interface PropsNav {
  totalClients: number;
  limit: number;
  setLimit: (limit: number) => void;
}
const Nav: React.FC<PropsNav> = ({ totalClients, limit, setLimit }) => {
  return (
    <div className="flex flex-initial justify-between gap-6 pb-3 text-[18px] font-light">
      <p>
        <span className="font-semibold">{totalClients}</span> clientes
        encontrados
      </p>

      <div className="flex gap-2">
        <p>Clientes por página:</p>
        <select
          value={limit}
          className="border-border min-w-[50px] rounded-sm border text-[12px]"
          onChange={(e) => setLimit(+e.target.value)}
        >
          <option value="16">16</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
        </select>
      </div>
    </div>
  );
};

interface PropsBody {
  clients: Client[];
}

const Body: React.FC<PropsBody> = ({ clients }) => {
  return (
    <div className="flex max-h-[600px] flex-1 flex-wrap items-start justify-center gap-5 overflow-y-scroll">
      {clients.map((client) => (
        <CardClient.Root key={client.id}>
          <CardClient.Content
            name={client.name}
            salary={client.salary}
            companyValue={client.companyValue}
          />
          <CardClient.Footer
            id={client.id}
            selected={client.selected || false}
            variants={["select", "edit", "remove"]}
          />
        </CardClient.Root>
      ))}
    </div>
  );
};
interface PropsFooter {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Footer: React.FC<PropsFooter> = ({
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
    <div className="flex-initial pt-4 pb-5">
      <Button className="border-primary hover:bg-primary text-primary hover:text-secondary w-full border bg-transparent text-[14px] font-bold">
        Criar cliente
      </Button>
      <div className="mt-4 flex w-full justify-center">
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
      </div>
    </div>
  );
};

const ClientList = () => {
  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(16);
  const { data, refetch } = useFetchClient({ page, limit });

  useEffect(() => {
    refetch();
  }, [page, limit]);

  return (
    <div className="flex h-full flex-col px-[120px] pt-[30px]">
      <Nav
        totalClients={data?.totalClients || 0}
        limit={limit}
        setLimit={setLimit}
      />
      <Body clients={data?.clients || []} />

      <Footer
        currentPage={page}
        totalPages={data?.totalPages || 0}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ClientList;
