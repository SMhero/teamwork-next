"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";
import { z } from "zod";

import EmailIcon from "@/components/icons/EmailIcon";
import EyeIcon from "@/components/icons/EyeIcon";
import { routes } from "@/config/app";
// import { login } from "@/actions/login";
// import { useZustandStore } from "@/components/Provider/ZustandProvider";

const FormSchema = z.object({
  email: z.string().email({ message: "Field must be a valid email" }),
  password: z.string().min(3, { message: "Field has at least 3 characters" }),
});

type FormData = z.infer<typeof FormSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    setError,
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = handleSubmit(async values => {
    try {
      // @FIX: mocking
      // await login({ email: values.email, password: values.password });
      setTimeout(() => {
        cookies.set("sessionid", crypto.randomUUID(), {
          // @NOTE: expires after 24 hours
          expires: new Date().getTime() + 60 * 60 * 24 * 1000,
        });
      }, 3000);

      router.replace(routes.team);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form
      className="flex flex-col justify-center gap-4"
      autoComplete="off"
      onFocus={() => clearErrors()}
      onSubmit={onSubmit}
      noValidate
    >
      <Input
        {...register("email")}
        errorMessage={errors.password?.message && errors.email?.message}
        onFocus={() => clearErrors()}
        isInvalid={!!errors.email?.message}
        isRequired
        label="Email"
        endContent={<EmailIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
        placeholder="email@example.com"
        type="email"
        required
      />
      <Input
        {...register("password")}
        errorMessage={errors.password?.message && errors.password?.message}
        onFocus={() => clearErrors()}
        isInvalid={!!errors.password?.message}
        isRequired
        label="Password"
        endContent={
          <span onClick={() => setIsVisible(!isVisible)} className="cursor-pointer">
            <EyeIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" isVisible={isVisible} />
          </span>
        }
        placeholder="Your tricky password"
        type={isVisible ? "text" : "password"}
        required
      />
      <Button className="w-full" color="primary" size="lg" type="submit" isDisabled={!isValid}>
        Log in
      </Button>
    </form>
  );
}
