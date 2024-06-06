"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useForm } from "react-hook-form";

const FormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
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

  const onOpen = () => {
    reset();
    onOpenChange();
  };

  const onSubmit = (onCloseCb: () => void) =>
    handleSubmit(values => {
      console.log(values);
      reset();
      onCloseCb();
    });

  const isDisabled = !isDirty || !isValid || isSubmitting;
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpen}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">New teammate</ModalHeader>
            <ModalBody>
              <form className="flex flex-col justify-center gap-4" onSubmit={() => onSubmit(onClose)}>
                <Input
                  errorMessage={errors.firstName?.message && errors.firstName?.message}
                  isInvalid={!!errors.firstName?.message}
                  isRequired
                  label="First name"
                  placeholder="Ivan"
                  {...register("firstName", { required: true })}
                />
                <Input
                  errorMessage={errors.lastName?.message && errors.lastName?.message}
                  isInvalid={!!errors.lastName?.message}
                  isRequired
                  label="Last name"
                  placeholder="Vinogradov "
                  {...register("lastName", { required: true })}
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
