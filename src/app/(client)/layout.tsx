import ClientLayout from "@/components/templates/ClientLayout";

export default function ClientRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
