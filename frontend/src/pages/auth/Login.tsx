import { Button } from '../../ components/button';
import { Input } from '../../ components/input';

const Login = () => {
  return (
    <div className="bg-muted w-dvw h-dvh flex items-center justify-center flex-col">
      <div className="flex flex-col w-full max-w-[521px] items-center">
        <h3 className="text-4xl">Olá, seja bem-vindo!</h3>
        <div className="w-full mt-5">
          <Input
            placeholder="Digite o seu usuário:"
            className="text-lg font-light"
          />
          <Input
            placeholder="Digite sua senha:"
            className="mt-1.5 mb-3 text-lg font-light"
          />
          <Button className="w-full text-xl font-semibold">Entrar</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
