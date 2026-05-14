import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { SplashScreen } from "@/components/SplashScreen";

export const Route = createFileRoute("/_main")({
  component: () => (
    <>
      <SplashScreen />
      <MobileShell />
    </>
  ),
});
