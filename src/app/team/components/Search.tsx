import SearchIcon from "@/components/icons/SearchIcon";
import { Input } from "@nextui-org/react";

export default function Search() {
  return (
    <Input
      endContent={<SearchIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
      placeholder="Type something useful.."
      required
    />
  );
}
