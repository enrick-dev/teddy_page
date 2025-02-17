import { Minus, Pencil, Plus, Trash2 } from "lucide-react";
import React, { PropsWithChildren } from "react";
import { Client } from "../hooks/client/useFetchClient";
import { useUpdateClient } from "../hooks/client/useUpdateClient";
import { cn } from "../utils/cn";
import DialogClient from "./dialog-client";

const CardClientRoot: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-background h-fit w-full max-w-[23.4%] rounded-sm p-4 text-center shadow">
      {children}
    </div>
  );
};

interface PropsCardClientContent {
  name: string;
  salary: number;
  companyValue: number;
}
const CardClientContent: React.FC<PropsCardClientContent> = ({
  name,
  salary,
  companyValue,
}) => {
  return (
    <div>
      <h4 className="pb-1 text-[18px] font-bold"> {name}</h4>
      <div className="space-y-1 text-[16px]">
        <p>Salário: {salary}</p>
        <p>Empresa: {companyValue}</p>
      </div>
    </div>
  );
};

interface PropsCardClientFooter {
  client: Client;
  selected: boolean;
  variants: ("select" | "edit" | "remove")[];
}

const CardClientFooter: React.FC<PropsCardClientFooter> = ({
  client,
  selected,
  variants,
}) => {
  const { mutate } = useUpdateClient();

  const selecting = (selected: boolean) => {
    mutate({
      id: client.id,
      selected,
    });
  };

  return (
    <div
      className={cn(
        "flex w-full gap-2 pt-4",
        variants.length > 1 ? "justify-between" : "justify-end",
      )}
    >
      {variants.includes("select") &&
        ((!selected && (
          <button className="cursor-pointer" onClick={() => selecting(true)}>
            <Plus className="size-[25px]" />
          </button>
        )) || (
          <button
            className="text-primary cursor-pointer"
            onClick={() => selecting(false)}
          >
            <Minus className="size-[25px]" />
          </button>
        ))}
      {variants.includes("edit") && (
        <DialogClient client={client} variant="edit">
          <Pencil className="size-[20px]" />
        </DialogClient>
      )}
      {variants.includes("remove") && (
        <button className="cursor-pointer">
          <Trash2 className="size-[20px] text-red-500" />
        </button>
      )}
    </div>
  );
};

const CardClient = {
  Root: CardClientRoot,
  Content: CardClientContent,
  Footer: CardClientFooter,
};

export default CardClient;
