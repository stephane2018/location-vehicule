import ClientLayout from "@/shared/components/templates/ClientLayout";

export default function ClientRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
