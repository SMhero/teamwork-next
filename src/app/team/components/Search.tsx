"use client";

import { ChangeEvent } from "react";
import SearchIcon from "@/components/icons/SearchIcon";
import { Input } from "@nextui-org/react";

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
};

export default function Search({ onChange, onClear }: Props) {
  return (
    <Input
      autoComplete="off"
      onChange={onChange}
      onClear={onClear}
      isClearable
      startContent={<SearchIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
      placeholder="Type teammate name or role"
    />
  );
}
