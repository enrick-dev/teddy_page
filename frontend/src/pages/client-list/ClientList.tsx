import React from "react";
import { Button } from "../../ components/button";
import CardClient from "../../ components/card-client";
import Pagination from "../../ components/pagination";
import { useAuth } from "../../context/auth";
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
          className="border-border h-fit min-w-[50px] rounded-sm border py-1 text-[12px]"
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
    <div className="flex max-h-[600px] flex-1 overflow-y-scroll">
      <div className="flex h-fit w-full flex-wrap items-start justify-center gap-5">
        {clients.map((client) => (
          <CardClient.Root key={client.id}>
            <CardClient.Content
              name={client.name}
              salary={client.salary}
              companyValue={client.companyValue}
            />
            <CardClient.Footer
              client={client}
              selected={client.selected || false}
              variants={["select", "edit", "remove"]}
            />
          </CardClient.Root>
        ))}
      </div>
    </div>
  );
};
interface PropsFooter {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Footer: React.FC<PropsFooter> = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex-initial pt-4 pb-5">
      <Button className="border-primary hover:bg-primary text-primary hover:text-secondary w-full border bg-transparent text-[14px] font-bold">
        Criar cliente
      </Button>
      <div className="mt-4 flex w-full justify-center">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

const ClientList = () => {
  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(16);
  const { userID } = useAuth();
  const { data, refetch } = useFetchClient({ page, limit, userID });

  React.useEffect(() => {
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
        page={page}
        totalPages={data?.totalPages || 0}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ClientList;
