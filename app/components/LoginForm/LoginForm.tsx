"use client";
import React from "react";
// import { login } from "@/app/actions";
import { login } from "@/app/(auth)/actions";
import {
  Box,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Stack,
  TextInput,
  Title,
  Text,
  Anchor
} from "@mantine/core";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  return (
    <Container>
      <Center>
        <Card shadow="sm" padding="lg" radius="md" withBorder w="30vw">
          <Title order={3} mb={20}>
            Login to your <Text c="green" inherit>Tickets Manager Account.</Text>
          </Title>
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
              <Button type="submit" color="green">
                Log in
              </Button>
              {/* <Button formAction={signup}>Sign up</Button> */}
            </Stack>
          </form>
          <Divider my="md" />
          <Text>No account yet? <Anchor href="/signup">Sign Up here.</Anchor></Text>
        </Card>
      </Center>
    </Container>
  );
}
