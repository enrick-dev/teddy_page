import React from 'react';
import { Button } from '../../ components/button';
import { Input } from '../../ components/input';
import { useAuth } from '../../context/auth';

const Login = () => {
  const { sign, isError, error, isPending } = useAuth();

  const inputUsername = React.useRef<HTMLInputElement>(null);
  const inputPassword = React.useRef<HTMLInputElement>(null);

  const login = () => {
    sign({
      username: inputUsername.current?.value ?? '',
      password: inputPassword.current?.value ?? '',
    });
  };

  const errormsg = error as { message: string | [] };

  const messageError =
    (!!(typeof errormsg?.message == 'object' && errormsg?.message.length) &&
      errormsg?.message[0]) ||
    errormsg?.message;

  return (
    <div className="bg-muted w-dvw h-dvh flex items-center justify-center flex-col">
      <div className="flex flex-col w-full max-w-[521px] items-center">
        <h3 className="text-4xl">Olá, seja bem-vindo!</h3>
        <div className="w-full mt-5">
          <Input
            ref={inputUsername}
            placeholder="Digite o seu usuário:"
            className="text-lg font-light"
          />
          <Input
            ref={inputPassword}
            placeholder="Digite sua senha:"
            className="mt-1.5 mb-3 text-lg font-light"
          />
          {isError && (
            <p className="text-red-700 font-medium text-center">
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
