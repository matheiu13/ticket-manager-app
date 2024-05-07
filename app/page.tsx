import AuthForm from "./components/AuthForm/AuthForm";
import { Button, Center, Container, Stack, Text, Title } from "@mantine/core";
import LoginForm from "./components/LoginForm/LoginForm";
import Link from "next/link";
export default function Home() {
  return (
    <Container>
      <Title>Welcome to Tickets App</Title>
      <Center>
        {/* <AuthForm /> */}
        <LoginForm />
      </Center>
    </Container>
  );
}
