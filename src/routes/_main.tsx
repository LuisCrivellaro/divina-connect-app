import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/_main")({
  component: MobileShell,
});
