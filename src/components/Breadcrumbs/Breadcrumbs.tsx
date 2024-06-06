"use client";

import { Breadcrumbs as NextBreadcrumbs, BreadcrumbItem } from "@nextui-org/react";

type Props = {
  list: {
    label: string;
    href: string;
  }[];
};

export default function Breadcrumbs({ list }: Props) {
  return (
    <NextBreadcrumbs variant="solid">
      {list.map(breadcrumb => (
        <BreadcrumbItem key={breadcrumb.label} href={breadcrumb.href}>
          {breadcrumb.label}
        </BreadcrumbItem>
      ))}
    </NextBreadcrumbs>
  );
}
