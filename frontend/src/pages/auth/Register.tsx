import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../ components/button";
import { Input } from "../../ components/input";
import { useAuth } from "../../context/auth";

const Register = () => {
  const { register, isError, error, isPending, token } = useAuth();

  const inputFirstName = React.useRef<HTMLInputElement>(null);
  const inputLastName = React.useRef<HTMLInputElement>(null);
  const inputUsername = React.useRef<HTMLInputElement>(null);
  const inputPassword = React.useRef<HTMLInputElement>(null);

  const login = () => {
    const name = `${inputFirstName.current?.value} ${inputLastName.current?.value || ""}`;
    register({
      name,
      username: inputUsername.current?.value ?? "",
      password: inputPassword.current?.value ?? "",
    });
  };

  const errormsg = error as { message: string | [] };

  const messageError =
    (!!(typeof errormsg?.message == "object" && errormsg?.message.length) &&
      errormsg?.message[0]) ||
    errormsg?.message;

  const navigate = useNavigate();
  React.useEffect(() => {
    if (token) navigate("/clientes");
  }, [token, navigate]);

  return (
    <div className="bg-muted flex h-dvh w-dvw flex-col items-center justify-center px-4">
      <div className="mb-8 flex items-center justify-center gap-2 max-sm:mb-4">
        <img src="./logo.png" className="w-36" />
      </div>

      <div className="bg-background w-full max-w-[500px] space-y-4 rounded-xl border border-slate-200 p-5 shadow shadow-lg">
        <div className="space-y-1">
          <div className="text-center text-2xl font-bold">Criar conta</div>
          <div className="text-muted-foreground text-center text-sm">
            Preencha seus dados para criar sua conta
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Nome
              </label>
              <Input
                ref={inputFirstName}
                type="text"
                className="text-sm font-light"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Sobrenome
              </label>
              <Input
                ref={inputLastName}
                id="firstName"
                type="text"
                className="text-sm font-light"
              />
            </div>
          </div>
          <div className="space-y-1">
            <div>
              <label
                htmlFor="username"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Usuário
              </label>
            </div>
            <Input
              ref={inputUsername}
              id="username"
              placeholder="jhondoe"
              type="text"
              className="text-sm font-light"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Senha
              </label>
            </div>
            <Input
              ref={inputPassword}
              id="password"
              type="password"
              className="text-sm font-light"
            />
          </div>
          {isError && (
            <p className="-mt-1 mb-2 text-center text-sm font-medium text-red-700">
              {messageError}
            </p>
          )}

          <Button
            className="w-full font-semibold"
            onClick={login}
            isLoading={isPending}
          >
            Criar conta
          </Button>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Já tem uma conta?{" "}
            <Link
              to="/entrar"
              className="text-primary hover:text-primary/90 font-medium"
            >
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
