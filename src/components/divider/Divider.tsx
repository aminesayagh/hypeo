import { Divider as HerouiDivider } from "@heroui/react";

export function DividerLevel1({ className, orientation }: { className?: string, orientation?: 'horizontal' | 'vertical' }) {
  return <HerouiDivider className={ className} orientation={orientation || 'horizontal'} />;
}   