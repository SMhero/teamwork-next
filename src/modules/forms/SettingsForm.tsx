"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { z } from "zod";
import { updateProfile } from "@/actions/profile/update";
import { Profile } from "@/types/profile";

const TIMEZONES_LIST = Intl.supportedValuesOf("timeZone");

const FormSchema = z.object({
  defaultMeetingDuration: z.number().min(10),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  team: z.string().min(4),
  timezone: z.string().refine(tz => TIMEZONES_LIST.includes(tz), {
    message: "Invalid timezone",
  }),
});

type FormData = z.infer<typeof FormSchema>;

type Props = {
  profile: Profile;
};

export default function SettingsForm({ profile }: Props) {
  const router = useRouter();

  const defaultValues = { ...profile };

  const {
    control,
    formState: { errors, isValid, isDirty, isSubmitting },
    handleSubmit,
    register,
    clearErrors,
    reset,
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const onSubmit = handleSubmit(async values => {
    try {
      await updateProfile(profile, values);
      // @NOTE: to make form persisted
      reset(values);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  });

  const isDisabled = !isDirty || !isValid || isSubmitting;
  return (
    <form
      className="flex flex-col justify-center gap-4"
      autoComplete="off"
      onFocus={() => clearErrors()}
      onSubmit={onSubmit}
      noValidate
    >
      <Input
        errorMessage={errors.firstName?.message && errors.firstName?.message}
        isRequired
        isInvalid={!!errors.firstName?.message}
        label="First name"
        placeholder="John"
        defaultValue={defaultValues.firstName}
        {...register("firstName", { required: true })}
      />
      <Input
        errorMessage={errors.lastName?.message && errors.lastName?.message}
        isRequired
        isInvalid={!!errors.lastName?.message}
        label="Last name"
        placeholder="Doe"
        defaultValue={defaultValues.lastName}
        {...register("lastName", { required: true })}
      />
      <Input
        errorMessage={errors.team?.message && errors.team?.message}
        isRequired
        isInvalid={!!errors.team?.message}
        label="Team name"
        placeholder="Ghostbusters"
        defaultValue={defaultValues.team}
        {...register("team", { required: true })}
      />
      <Controller
        name="timezone"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Select
            label="Timezone"
            placeholder="Europe/Rostov-on-Don"
            onBlur={onBlur}
            // @NOTE: this is a strange approach to get hook from update - should be investigated
            onSelectionChange={selection => {
              onChange(Array.from(selection)[0]);
            }}
            errorMessage={errors.timezone && "Selecting timezone is required"}
            isInvalid={!!errors.timezone?.message}
            selectedKeys={value ? [value] : []}
          >
            {TIMEZONES_LIST.map(timezone => (
              <SelectItem key={timezone} textValue={timezone}>
                {timezone}
              </SelectItem>
            ))}
          </Select>
        )}
      />
      <Input
        errorMessage={errors.defaultMeetingDuration?.message && errors.defaultMeetingDuration?.message}
        isInvalid={!!errors.defaultMeetingDuration?.message}
        label="Meeting duration (minutes)"
        placeholder="30"
        defaultValue={String(defaultValues.defaultMeetingDuration)}
        {...register("defaultMeetingDuration", { valueAsNumber: true, required: true })}
      />
      <Button
        className="w-full"
        color="primary"
        size="lg"
        type="submit"
        isDisabled={isDisabled}
        isLoading={isSubmitting}
      >
        Update
      </Button>
    </form>
  );
}
