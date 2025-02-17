import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ components/button";
import { Input } from "../../ components/input";
import { useAuth } from "../../context/auth";

const Login = () => {
  const { sign, isError, error, isPending, token } = useAuth();

  const inputUsername = React.useRef<HTMLInputElement>(null);
  const inputPassword = React.useRef<HTMLInputElement>(null);

  const login = () => {
    sign({
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
    if (token) navigate("/");
  }, [token]);

  return (
    <div className="bg-muted flex h-dvh w-dvw flex-col items-center justify-center">
      <div className="flex w-full max-w-[521px] flex-col items-center">
        <h3 className="text-4xl">Olá, seja bem-vindo!</h3>
        <div className="mt-5 w-full">
          <Input
            ref={inputUsername}
            placeholder="Digite o seu usuário:"
            type="text"
            className="text-lg font-light"
          />
          <Input
            ref={inputPassword}
            type="password"
            placeholder="Digite sua senha:"
            className="mt-1.5 mb-3 text-lg font-light"
          />
          {isError && (
            <p className="text-center font-medium text-red-700">
              {messageError}
            </p>
          )}
          <Button
            className="w-full text-xl font-semibold"
            onClick={login}
            isLoading={isPending}
          >
            Entrar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
