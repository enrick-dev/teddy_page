import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { PropsWithChildren } from "react";
import { cn } from "../utils/cn";

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
type CardClientFooterVariants = "select" | "edit" | "remove";

interface PropsCardClientFooter {
  id: number;
  variants: CardClientFooterVariants[];
}

const CardClientFooter: React.FC<PropsCardClientFooter> = ({
  id,
  selected,
  variants,
}) => {
  return (
    <div
      className={cn(
        "flex w-full gap-2 pt-4",
        variants.length > 1 ? "justify-between" : "justify-end",
      )}
    >
      {variants.includes("select") && (
        <button className="cursor-pointer">
          <Plus className="size-[25px]" />
        </button>
      )}
      {variants.includes("edit") && (
        <button className="cursor-pointer">
          <Pencil className="size-[20px]" />
        </button>
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
