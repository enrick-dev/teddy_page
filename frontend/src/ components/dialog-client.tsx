import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import React, { PropsWithChildren, useRef } from "react";
import { useAuth } from "../context/auth";
import { Client } from "../hooks/client/useFetchClient";
import { useUpdateClient } from "../hooks/client/useUpdateClient";
import { Button } from "./button";
import { Input } from "./input";

interface PropsComponent {
  client: Client;
  userID: number;
  onSuccessChange: VoidFunction;
}

const ComponentEdit: React.FC<PropsComponent> = ({
  client,
  onSuccessChange,
}) => {
  const { mutate, isPending } = useUpdateClient();
  const inputName = useRef<HTMLInputElement | null>(null);
  const inputSalary = useRef<HTMLInputElement | null>(null);
  const inputCompanyValue = useRef<HTMLInputElement | null>(null);

  const editClient = () => {
    mutate(
      {
        id: client.id,
        name: inputName.current?.value ?? "",
        salary: Number(inputSalary.current?.value ?? 0),
        companyValue: Number(inputCompanyValue.current?.value ?? 0),
      },
      { onSuccess: onSuccessChange },
    );
  };

  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Input
          ref={inputName}
          defaultValue={client.name}
          placeholder="Digite o nome:"
        />
        <Input
          ref={inputSalary}
          defaultValue={client.salary}
          placeholder="Digite o salário:"
        />
        <Input
          ref={inputCompanyValue}
          defaultValue={client.companyValue}
          placeholder="Digite o valor da empresa:"
        />
      </div>
      <Button
        className="mt-3.5 w-full py-3 text-[14px] font-bold"
        onClick={editClient}
        isLoading={isPending}
      >
        Editar cliente
      </Button>
    </div>
  );
};

interface PropsDialogClient extends PropsWithChildren {
  client: Client;
  variant: "add" | "edit" | "remove";
}

const Forms = {
  add: { text: "Criar cliente:", component: ComponentEdit },
  edit: { text: "Editar cliente:", component: ComponentEdit },
  remove: { text: "Remover cliente:", component: ComponentEdit },
};

const DialogClient: React.FC<PropsDialogClient> = ({
  client,
  variant,
  children,
}) => {
  const [open, setOpen] = React.useState(false);
  const { userID } = useAuth();
  const FormTitle = Forms[variant].text || "";
  const FormComponent = Forms[variant].component;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <div className="cursor-pointer">{children}</div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80" />
        <Dialog.Content className="bg-background data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-[400px] translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-sm">
          <div className="flex flex-col gap-2">
            <h4 className="text-[16px] font-bold">{FormTitle}</h4>
            <FormComponent
              client={client}
              userID={userID}
              onSuccessChange={() => setOpen(false)}
            />
          </div>
          <Dialog.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 cursor-pointer rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default DialogClient;
