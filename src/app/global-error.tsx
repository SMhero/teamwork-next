"use client";

import { Button } from "@nextui-org/react";
import { useEffect } from "react";

type Props = {
  error: {
    digest?: string;
  } & Error;
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h1>Something went wrong!</h1>
      <Button onClick={() => reset()} className="mt-8" color="primary" size="lg">
        Try again
      </Button>
    </div>
  );
}
