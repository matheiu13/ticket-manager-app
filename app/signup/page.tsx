import React from 'react'
import { Container, Title } from "@mantine/core"
import SignupForm from '../components/SignupForm/SignupForm'
export default function page() {
  return (
    <Container>
        <Title>Create a new account</Title>
        <SignupForm/>
    </Container>
  )
}
