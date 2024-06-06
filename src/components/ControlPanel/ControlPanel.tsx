"use client";

type Props = {
  children: React.ReactNode;
};

export default function ControlPanel({ children }: Props) {
  return (
    <div className="flex items-center justify-between my-6 max-sm:flex-col max-sm:items-start max-sm:gap-3">
      {children}
    </div>
  );
}
