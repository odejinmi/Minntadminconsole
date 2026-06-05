import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const palette: { group: string; swatches: { name: string; value: string }[] }[] =
  [
    {
      group: "Brand",
      swatches: [
        { name: "primary / brand", value: "#9FE870" },
        { name: "forest", value: "#163300" },
        { name: "sage", value: "#B4BEAD" },
        { name: "brand-muted", value: "#DCFCE7" },
      ],
    },
    {
      group: "Neutrals",
      swatches: [
        { name: "foreground", value: "#0A0A0A" },
        { name: "muted-foreground", value: "#6B7280" },
        { name: "border", value: "#E5E7EB" },
        { name: "muted", value: "#F9FAFB" },
        { name: "background", value: "#FFFFFF" },
      ],
    },
    {
      group: "Semantic",
      swatches: [
        { name: "success", value: "#22C55E" },
        { name: "warning", value: "#F59E0B" },
        { name: "danger", value: "#EF4444" },
        { name: "info", value: "#008CFF" },
      ],
    },
    {
      group: "Accents",
      swatches: [
        { name: "violet", value: "#7C3AED" },
        { name: "cyan", value: "#06B6D4" },
        { name: "blue", value: "#0056B3" },
      ],
    },
  ];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-12 px-6 py-12">
      <header className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          minnt · design system
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">Admin Console</h1>
        <p className="text-muted-foreground">
          Tokens, type, and core components derived from the Figma board.
        </p>
      </header>

      <Section title="Typography">
        <div className="space-y-3 rounded-lg border p-6">
          <p className="font-display text-3xl font-semibold">
            Bricolage Grotesque — display
          </p>
          <p className="text-base">
            Inter — body / UI. The quick brown fox jumps over the lazy dog.
          </p>
          <p className="text-sm text-muted-foreground">
            Muted secondary text for hints and metadata.
          </p>
        </div>
      </Section>

      <Section title="Color palette">
        <div className="space-y-6">
          {palette.map((group) => (
            <div key={group.group} className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {group.group}
              </p>
              <div className="flex flex-wrap gap-4">
                {group.swatches.map((s) => (
                  <div key={s.name} className="space-y-1.5">
                    <div
                      className="size-20 rounded-lg border"
                      style={{ backgroundColor: s.value }}
                    />
                    <p className="text-xs font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge className="bg-success text-success-foreground">Success</Badge>
          <Badge className="bg-warning text-warning-foreground">Warning</Badge>
          <Badge className="bg-info text-info-foreground">Info</Badge>
        </div>
      </Section>

      <Section title="Form">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Enter your credentials to continue.</CardDescription>
            <CardAction>
              <Badge variant="outline">Demo</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@minnt.co" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button className="w-full">Sign in</Button>
            <Button variant="ghost" className="w-full">
              Forgot password?
            </Button>
          </CardFooter>
        </Card>
      </Section>
    </main>
  );
}
