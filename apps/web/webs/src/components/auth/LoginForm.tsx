import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Link, useNavigate } from "react-router-dom";

import authConfig from "@/config/auth.config";

import { useLogin } from "@/features/auth/hooks";

import {
  loginSchema,
  type LoginFormData,
} from "@/features/auth/validations/login.schema";

import { Button } from "@/design-system/components/buttons/Button";

import { Input } from "@/design-system/components/base/Input";

import { PasswordInput } from "@/design-system/components/base/PasswordInput/PasswordInput";

import { Checkbox } from "@/design-system/components/base/Checkbox";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/design-system/components/data-display/Card";

export default function LoginForm() {
  const navigate = useNavigate();



















  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",

      password: "",

      rememberMe: false,
    },
  });

  async function onSubmit(
    values: LoginFormData,
  ) {
    await login.mutateAsync(values);

    navigate(
      authConfig.dashboardRoute,
      {
        replace: true,
      },
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          Sign In
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <Input
            label="Email Address"
            type="email"
            size="lg"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />

          <PasswordInput
            label="Password"
            autoComplete="current-password"
            error={
              errors.password?.message
            }
            {...register("password")}
          />

          <Checkbox
            label="Remember me"
            {...register("rememberMe")}
          />

          <Button
            type="submit"
            loading={login.isPending}
            fullWidth
          >
            Sign In
          </Button>
        </form>
        <span> <Link to="/register">  Register</Link> </span>
      </CardContent>
    </Card>
  );
}