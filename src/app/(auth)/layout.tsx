export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <div className="grid min-h-dvh place-items-center bg-muted/30 px-4 py-10">
      {children}
    </div>
  );
}
