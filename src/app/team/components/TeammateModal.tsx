"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useForm } from "react-hook-form";

const FormSchema = z.object({
  name: z.string().min(1),
  position: z.string().min(10),
});

type FormData = z.infer<typeof FormSchema>;

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

export default function TeammateModal({ isOpen, onOpenChange }: Props) {
  const {
    formState: { errors, isValid, isDirty, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (onCloseCb: () => void) =>
    handleSubmit(values => {
      console.log(values);
      reset();
      onCloseCb();
    });

  const isDisabled = !isDirty || !isValid || isSubmitting;
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">New teammate</ModalHeader>
            <ModalBody>
              <form className="flex flex-col justify-center gap-4" onSubmit={() => onSubmit(onClose)}>
                <Input
                  errorMessage={errors.name?.message && errors.name?.message}
                  isInvalid={!!errors.name?.message}
                  isRequired
                  label="Name"
                  placeholder="Vinogradov Ivan"
                  {...register("name", { required: true })}
                />
                <Input
                  errorMessage={errors.position?.message && errors.position?.message}
                  isInvalid={!!errors.position?.message}
                  isRequired
                  label="Position"
                  placeholder="Assistant regional manager"
                  {...register("position", { required: true })}
                />
                <Button
                  className="w-full"
                  color="primary"
                  size="lg"
                  type="submit"
                  isDisabled={isDisabled}
                  isLoading={isSubmitting}
                >
                  Hire to fire later
                </Button>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
