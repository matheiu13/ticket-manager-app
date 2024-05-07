"use client";
import React from "react";
// import { login } from "@/app/actions";
import { login } from "@/app/actions";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import Link from "next/link";

export default function LoginForm() {
  return (
    <Container>
      <Card shadow="sm" padding="lg" radius="md" withBorder w="30vw">
        <Title mb={20}>Login to your Tickets Manager Account.</Title>
        <form action={login}>
          <Stack gap={10}>
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
            <Button type="submit" color="green">Log in</Button>
            {/* <Button formAction={signup}>Sign up</Button> */}
          </Stack>
        </form>
        <Divider my="md"/>
          <Link href={`/signup`} style={{ textDecoration: "none" }}>
            <Button color="green" variant="outline" fullWidth>
              Create a new Account
            </Button>
          </Link>
      </Card>
    </Container>
  );
}
