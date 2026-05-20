import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { SettingsProvider } from "@/lib/settings";

export const Route = createFileRoute("/_main")({
  component: () => (
    <SettingsProvider>
      <MobileShell />
    </SettingsProvider>
  ),
});
