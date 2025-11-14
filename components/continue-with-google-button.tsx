"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth";

export default function ContinueWithGoogleButton() {
  const auth = useAuth();
  const router = useRouter();

  return (
    <Button
      className="w-full"
      onClick={async () => {
        await auth?.loginWithGoogle();
        router.refresh();
      }}
    >
      Continue with Google
    </Button>
  );
}
