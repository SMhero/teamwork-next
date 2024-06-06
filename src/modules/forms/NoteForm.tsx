"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  note: z.string().min(1),
});

type FormData = z.infer<typeof FormSchema>;

export default function NoteForm() {
  const {
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    register,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = handleSubmit(values => {
    console.log(values);
  });

  const isDisabled = !isValid || isSubmitting;

  return (
    <form className="flex flex-col justify-center gap-4" onSubmit={onSubmit}>
      <Textarea
        className="w-full"
        label="Note"
        placeholder="Put some words about your mate"
        errorMessage={errors.note?.message && errors.note?.message}
        isRequired
        isInvalid={!!errors.note?.message}
        {...register("note", { required: true })}
      />
      <Button
        className="w-full"
        color="primary"
        size="lg"
        type="submit"
        isDisabled={isDisabled}
        isLoading={isSubmitting}
      >
        Write it down
      </Button>
    </form>
  );
}
