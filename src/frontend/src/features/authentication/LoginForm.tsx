import { ArrowRight, Eye, EyeOff, Info, LockKeyhole, Mail } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Input } from "@/components/ui";

type FormErrors = {
  email?: string;
  password?: string;
};

function GoogleLogo() {
  return (
    <svg aria-hidden className="size-5 shrink-0" viewBox="0 0 48 48">
      <path d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" fill="#FFC107" />
      <path d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" fill="#FF3D00" />
      <path d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" fill="#4CAF50" />
      <path d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" fill="#1976D2" />
    </svg>
  );
}

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

      <div aria-hidden className="mt-6 flex items-center gap-4 text-xs font-semibold text-ink-subtle">
        <span className="h-px flex-1 bg-line" />
        ou
        <span className="h-px flex-1 bg-line" />
      </div>

      <Button
        className="mt-6 w-full border-line-strong bg-white text-ink shadow-none hover:border-line-strong hover:bg-surface-raised hover:shadow-[0_4px_14px_rgb(39_38_42/0.1)]"
        icon={<GoogleLogo />}
        onClick={() => navigate("/home")}
        size="lg"
        variant="secondary"
      >
        Entrar com o Google
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
