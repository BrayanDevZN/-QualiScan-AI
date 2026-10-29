import { ArrowRight, Eye, EyeOff, Info, LockKeyhole, Mail } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Alert, AlertDescription } from "@/components/shadcn/alert";
import { Button } from "@/components/shadcn/button";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";

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
    <form className="flex flex-col gap-6" noValidate onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <Label className="text-base font-semibold" htmlFor="email">E-mail corporativo</Label>
        <div className="relative">
          <Mail aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-subtle" />
          <Input
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            className="h-13 pl-12 text-base"
            id="email"
            inputMode="email"
            onChange={(event) => {
              setEmail(event.target.value);
              if (errors.email) setErrors((current) => ({ ...current, email: undefined }));
            }}
            placeholder="nome@empresa.com"
            type="email"
            value={email}
          />
        </div>
        {errors.email && <p className="text-sm font-medium text-danger" id="email-error">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-base font-semibold" htmlFor="password">Senha</Label>
        <div className="relative">
          <LockKeyhole aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-subtle" />
          <Input
            aria-describedby={errors.password ? "password-error" : undefined}
            aria-invalid={Boolean(errors.password)}
            autoComplete="current-password"
            className="h-13 px-12 text-base"
            id="password"
            onChange={(event) => {
              setPassword(event.target.value);
              if (errors.password) setErrors((current) => ({ ...current, password: undefined }));
            }}
            placeholder="Digite sua senha"
            type={showPassword ? "text" : "password"}
            value={password}
          />
          <Button
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            className="absolute top-1/2 right-1 -translate-y-1/2"
            onClick={() => setShowPassword((current) => !current)}
            size="icon-sm"
            type="button"
            variant="ghost"
          >
            {showPassword ? <EyeOff aria-hidden /> : <Eye aria-hidden />}
          </Button>
        </div>
        {errors.password && <p className="text-sm font-medium text-danger" id="password-error">{errors.password}</p>}
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Checkbox id="remember" />
          <Label className="text-sm font-medium text-ink-muted" htmlFor="remember">Lembrar de mim</Label>
        </div>
        <Button className="h-auto p-0 text-sm" onClick={handleForgotPassword} type="button" variant="link">
          Esqueci minha senha
        </Button>
      </div>

      <Button size="lg" type="submit">
        Entrar no QualiScan <ArrowRight aria-hidden />
      </Button>

      {message && (
        <Alert aria-live="polite" role="status">
          <Info aria-hidden />
          <AlertDescription className="text-ink-muted">{message}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
