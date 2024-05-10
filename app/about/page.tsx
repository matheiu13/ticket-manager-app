import {
  Anchor,
  Blockquote,
  Box,
  Center,
  Container,
  Group,
  Stack,
  Stepper,
  StepperStep,
  Text,
  Title,
} from "@mantine/core";
import React from "react";

export default function About() {
  return (
    <Container>
      <Box h="90vh">
        <Text c="gray">
          Hello my name is Matheiu Perdido and I am a recent graduate of BSIT
          from Technological Institute of the Philippines, Quezon City. This is
          a personal project of mine that aims to showcase CRUD functionalities
          of an application. This project also aims to refine my skills as a
          fullstack developer and hopefully also helps me land a job as a
          developer.
        </Text>
        <br />
        <Title>To use the application you can use</Title>

        <br />
        <Stack>
          <Blockquote color="blue">
            <i>For an admin account</i>
            <br />
            <br />
            Email: <b>admin@email.com</b>
            <br />
            Password: <b>adminadmin</b>
          </Blockquote>
          <Blockquote color="blue">
            <i>For a user account</i>
            <br />
            <br />
            Email: <b>user1@email.com</b>
            <br />
            Password: <b>user1user1</b>
          </Blockquote>
        </Stack>
        <br />
        <Text>
          Or you can create a new user account at the{" "}
          <Anchor href="/signup">
            <u>Sign up Page</u>
          </Anchor>
        </Text>
        <Title order={2} c="gray">
          Made with: NextJS, React, MantineUI, Supabase, PostgreSQL
        </Title>
        <br />
      </Box>
      <Box>
        <Text>
          The application is currently in it&apos;s earliest stage but here is
          the complete map of what&apos;s going to be my plan for this fullstack
          project
        </Text>
        <br />
        <Center>
          <Stepper color="teal" active={5} orientation="vertical">
            <StepperStep
              label="Step 1"
              description="Create a basic CRUD app with nextjs and supabase"
            />
            <StepperStep
              label="Step 2"
              description="Configure database with multiple tables"
            />
            <StepperStep
              label="Step 3"
              description="Add policies in supabase to establish role based actions"
            />
            <StepperStep
              label="Step 4"
              description="Design the application based on functionalities"
            />
            <StepperStep
              label="Step 5"
              description="Deploy the beta version in vercel"
            />
            <StepperStep
              label="Step 6"
              description="Refine CSS and add more QoL features for ease of access to users"
            />
            <StepperStep
              label="Step 7"
              description="Add role/s that will handle groups of users"
            />
            <StepperStep
              label="Step 8"
              description="Add more policies where higher ranking roles can freely edit user accounts"
            />
            <StepperStep
              label="Step 9"
              description="Think of more ideas on how to expand the application before proceeding"
            />
          </Stepper>
        </Center>
      </Box>
    </Container>
  );
}
