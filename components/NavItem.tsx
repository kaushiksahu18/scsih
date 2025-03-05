import Link from "next/link";
import React from "react";

export interface NavItemProps {
  link: string;
  icon: React.ReactNode;
  className?: string;
}

function NavItem({ link, className, icon }: NavItemProps) {
  return (
    <Link className={className} href={link} prefetch={false}>
      {icon}
    </Link>
  );
}

export default NavItem;
