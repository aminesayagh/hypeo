import { Divider as HerouiDivider } from "@heroui/react";
import clsx from "clsx";

export function DividerLevel1({ className, orientation }: { className?: string, orientation?: 'horizontal' | 'vertical' }) {
  return <HerouiDivider className={ className} orientation={orientation || 'horizontal'} />;
}   