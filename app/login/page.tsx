import React from 'react'
import { Container, Title } from "@mantine/core"
import LoginForm from "../components/LoginForm/LoginForm";
export default function page() {
  return (
    <Container>
        <Title>Login to your account</Title>
        <LoginForm />
    </Container>
  )
}
