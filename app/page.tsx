import {
  Anchor,
  Box,
  Button,
  Center,
  Group,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import createSupabaseServerClient from "@/utils/supabase/server";
import { redirect } from "next/navigation";
export default async function Page() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect("/home");
  }
  return (
    <Center>
      <Stack>
        <Box p={25}>
          <Title size="114px" fw={800}>
            Welcome to
            <Text
              gradient={{ from: "green", to: "cyan", deg: 90 }}
              variant="gradient"
              inherit
            >
              Tickets Manager App
            </Text>
          </Title>
          <Title order={2} c="gray">
            A Role Based Access Control Application for handling ticket requests
            made by users.
          </Title>
          <Text c="gray">
            Please head to <Anchor href="/about"><u>About Page</u></Anchor> to learn more on how to use the application.
          </Text>
        </Box>
        <Space h="xl" />
        <Title order={3}>Links to my Accounts.</Title>
        <Group>
          <Link href="https://github.com/matheiu13" target="_blank">
            <Button leftSection={<FaGithub />} variant="outline" color="teal">
              Github
            </Button>
          </Link>
          <Link
            href="https://www.linkedin.com/in/matheiu-perdido/"
            target="_blank"
          >
            <Button leftSection={<FaLinkedin />} variant="outline" color="teal">
              LinkedIn
            </Button>
          </Link>
        </Group>
      </Stack>
    </Center>
  );
}
