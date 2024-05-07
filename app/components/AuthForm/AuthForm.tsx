"use client";
import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Container } from "@mantine/core";

export default function AuthForm() {
  const supabase = createClientComponentClient();
  return (
    <Container>
      <Auth
        supabaseClient={supabase}
        view="magic_link"
        showLinks={false}
        providers={[]}
        redirectTo="http://localhost:3000/auth/callback"
        appearance={{
          theme: ThemeSupa,
        }}
        theme="dark"
      />
    </Container>
  );
}
