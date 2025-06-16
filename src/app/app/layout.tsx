import { AppLayout as AppLayoutComponent } from "./_components/AppLayout";

export default function AppLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayoutComponent className="h-full">
      {children}
    </AppLayoutComponent>
  );
}