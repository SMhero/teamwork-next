"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { updateProfile } from "@/actions/profile";
import { useZustandStore } from "@/components/Provider/ZustandProvider";

const FormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  "team.name": z.string().min(4),
});

type FormData = z.infer<typeof FormSchema>;

export default function SettingsForm() {
  const router = useRouter();
  const { profile } = useZustandStore(state => state);
  const [isVisible, setIsVisible] = useState(false);

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      "team.name": profile?.team,
    },
    mode: "onBlur",
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = handleSubmit(async values => {
    try {
      updateProfile();
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
        {...register("firstName")}
        errorMessage={errors.firstName?.message && errors.firstName?.message}
        isInvalid={!!errors.firstName?.message}
        isRequired
        label="First name"
        placeholder="John"
        required
      />
      <Input
        {...register("lastName")}
        errorMessage={errors.lastName?.message && errors.lastName?.message}
        isInvalid={!!errors.lastName?.message}
        isRequired
        label="Last name"
        placeholder="Doe"
        required
      />
      <Input
        {...register("team.name")}
        errorMessage={errors["team.name"]?.message && errors["team.name"]?.message}
        isInvalid={!!errors["team.name"]?.message}
        isRequired
        label="Team name"
        placeholder="Ghostbusters"
        required
      />
      <Button className="w-full" color="primary" size="lg" type="submit" isDisabled={!isValid}>
        Update
      </Button>
    </form>
  );
}
