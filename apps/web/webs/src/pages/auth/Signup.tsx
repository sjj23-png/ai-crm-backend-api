import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {apiClient} from "@/services/api";
import api from "@/constants/api";

import {
  RegisterSchema,
  type RegisterDto,
} from "@/features/auth/validations/register.schema";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/design-system/components/data-display/Card";

import { Input } from "@/design-system/components/base/Input";
import { PasswordInput } from "@/design-system/components/base/PasswordInput/PasswordInput";
import { Checkbox } from "@/design-system/components/base/Checkbox";
import { Button } from "@/design-system/components/buttons/Button";

export default function RegisterPage() {

  const navigate = useNavigate();

  const [logo, setLogo] = useState<File>();

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      code: "",
      email: "",
      phone: "",
      website: "",
      ownerName: "",
      ownerEmail: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  async function onSubmit(values: RegisterDto) {

    try {

      setServerError("");

      const formData = new FormData();

      formData.append("name", values.name);

      if (values.code)
        formData.append("code", values.code);

      formData.append("email", values.email);

      if (values.phone)
        formData.append("phone", values.phone);

      if (values.website)
        formData.append("website", values.website);

      formData.append("ownerName", values.ownerName);

      formData.append("ownerEmail", values.ownerEmail);

      formData.append("password", values.password);

      formData.append(
        "confirmPassword",
        values.confirmPassword,
      );

      if (logo)
        formData.append("logo", logo);

      await apiClient.post(
        api.auth.register,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        },
      );

      navigate("/login");

    } catch (error: any) {

      setServerError(
        error?.response?.data?.message ??
          "Registration failed",
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-8">

      <Card className="w-full max-w-2xl">

        <CardHeader>

          <CardTitle>
            Create Organization
          </CardTitle>

        </CardHeader>

        <CardContent>

          {serverError && (
            <div className="mb-5 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
              {serverError}
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* Organization */}

            <Input
              label="Organization Name"
              {...register("name")}
              error={errors.name?.message}
            />

            <Input
              label="Organization Code"
              {...register("code")}
              error={errors.code?.message}
            />

            <Input
              label="Organization Email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />

            <Input
              label="Phone Number"
              {...register("phone")}
              error={errors.phone?.message}
            />

            <Input
              label="Website"
              {...register("website")}
              error={errors.website?.message}
            />

            <div>

              <label className="mb-2 block text-sm font-medium">
                Company Logo
              </label>

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={(e) =>
                  setLogo(e.target.files?.[0])
                }
              />

            </div>

            {/* Owner */}

            <Input
              label="Owner Name"
              {...register("ownerName")}
              error={errors.ownerName?.message}
            />

            <Input
              label="Owner Email"
              type="email"
              {...register("ownerEmail")}
              error={errors.ownerEmail?.message}
            />

            <PasswordInput
              label="Password"
              {...register("password")}
              error={errors.password?.message}
            />

            <PasswordInput
              label="Confirm Password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />

            <Checkbox
              label="I agree to the Terms & Privacy Policy"
              {...register("terms")}
            />

            <Button
              type="submit"
              fullWidth
            >
              Create Organization
            </Button>

          </form>

          <div className="mt-6 text-center text-sm">

            Already have an account?

            <Link
              to="/login"
              className="ml-2 text-primary font-medium"
            >
              Sign In
            </Link>

          </div>

        </CardContent>

      </Card>

    </div>
  );
}