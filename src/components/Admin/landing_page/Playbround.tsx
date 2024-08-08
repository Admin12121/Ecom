"use client";
import { Spinner, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const Playbround = () => {
  const params = useParams<{ layoutslug: string }>();
  const layoutslug = decodeURIComponent(params.layoutslug);
  return (
    <div className="p-5">
      <span>
        <Breadcrumbs>
          <BreadcrumbItem>
            <Link href="/admin/layout" className="text-foreground/50">
              Layouts
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>{layoutslug}</BreadcrumbItem>
        </Breadcrumbs>
      </span>
    </div>
  );
};

export default Playbround;
