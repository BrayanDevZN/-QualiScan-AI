import { ArrowRight, Eye, EyeOff, Info, LockKeyhole, Mail } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Input } from "@/components/ui";

type FormErrors = {
  email?: string;
  password?: string;
};

export function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string>();
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(undefined);

    const nextErrors: FormErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Informe seu e-mail corporativo.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = "Digite um endereço de e-mail válido.";
    }

    if (!password) {
      nextErrors.password = "Informe sua senha.";
    } else if (password.length < 6) {
      nextErrors.password = "A senha deve ter pelo menos 6 caracteres.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    navigate("/home");
  }

  function handleForgotPassword() {
    setErrors({});
    setMessage("A recuperação de senha será conectada quando a autenticação real for implementada.");
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="space-y-5">
        <Input
          autoComplete="email"
          error={errors.email}
          icon={<Mail aria-hidden className="size-[1.125rem]" />}
          id="email"
          inputMode="email"
          label="E-mail corporativo"
          onChange={(event) => {
            setEmail(event.target.value);
            if (errors.email) setErrors((current) => ({ ...current, email: undefined }));
          }}
          placeholder="nome@empresa.com"
          type="email"
          value={email}
        />

        <Input
          autoComplete="current-password"
          endAdornment={
            <button
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              className="grid size-10 place-items-center text-ink-subtle hover:bg-surface-overlay hover:text-ink focus-visible:outline-2 focus-visible:outline-brand"
              onClick={() => setShowPassword((current) => !current)}
              type="button"
            >
              {showPassword ? <EyeOff aria-hidden className="size-[1.125rem]" /> : <Eye aria-hidden className="size-[1.125rem]" />}
            </button>
          }
          error={errors.password}
          icon={<LockKeyhole aria-hidden className="size-[1.125rem]" />}
          id="password"
          label="Senha"
          onChange={(event) => {
            setPassword(event.target.value);
            if (errors.password) setErrors((current) => ({ ...current, password: undefined }));
          }}
          placeholder="Digite sua senha"
          type={showPassword ? "text" : "password"}
          value={password}
        />
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <label className="group flex cursor-pointer items-center gap-2.5 text-xs font-medium text-ink-muted sm:text-sm">
          <input className="peer sr-only" type="checkbox" />
          <span className="grid size-[1.125rem] place-items-center rounded-sm border border-line-strong bg-white peer-checked:border-brand peer-checked:bg-brand peer-checked:[&_svg]:opacity-100 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand">
            <svg aria-hidden className="size-3 text-white opacity-0" fill="none" viewBox="0 0 12 12">
              <path d="m2.4 6.1 2.15 2.1L9.7 3.5" stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.8" />
            </svg>
          </span>
          Lembrar de mim
        </label>
        <button className="text-xs font-semibold text-brand hover:underline sm:text-sm" onClick={handleForgotPassword} type="button">
          Esqueci minha senha
        </button>
      </div>

      <Button className="mt-7 w-full" icon={<ArrowRight aria-hidden className="size-[1.125rem]" />} size="lg" type="submit">
        Entrar no QualiScan
      </Button>

      {message && (
        <div aria-live="polite" className="mt-4 flex gap-3 border-l-4 border-brand bg-[#f8ecea] p-4 text-xs leading-5 text-ink-muted">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" />
          <span>{message}</span>
        </div>
      )}
    </form>
  );
}
