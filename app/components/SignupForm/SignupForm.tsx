"use client";
import React from "react";
import { signup } from "@/app/(auth)/actions";
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

export default function SignupForm() {
  return (
    <Container>
      <Center>
        <Card shadow="sm" padding="lg" radius="md" withBorder w="30vw">
          <Title order={3} mb={20}>
            Create a new <Text c="green" inherit>Tickets Manager Account.</Text>
          </Title>
          <form action={signup}>
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
              <Button type="submit"  color="green">Sign up</Button>
            </Stack>
          </form>
          <Divider my="md" />
          <Text>Already have an account? <Anchor href="/login">Login here.</Anchor></Text>
        </Card>
      </Center>
    </Container>
  );
}
