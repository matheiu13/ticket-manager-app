"use client";
import React from "react";
import { signup } from "@/app/actions";
import { Button, Container, TextInput } from "@mantine/core";

export default function SignupForm() {
  return (
    <Container>
      <form action={signup}>
        <TextInput
          id="email"
          name="email"
          type="email"
          label="Email"
          required
        />
        <TextInput
          id="password"
          name="password"
          type="password"
          label="Password"
          required
        />
        <Button type="submit">Sign up</Button>
        {/* <Button formAction={signup}>Sign up</Button> */}
      </form>
    </Container>
  );
}
