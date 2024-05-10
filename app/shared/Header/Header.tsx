import {UserAvatar} from "@/app/account/avatar";
import createSupabaseServerClient from "@/utils/supabase/server";
import {
  Anchor,
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  Text,
  UnstyledButton,
} from "@mantine/core";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Header() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    // console.log(user);
  }
  const { data: url } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  return (
    <Box p={10} w="100vw" bg="black" mb={40} px="10vw">
      <Flex h="100%" align="center">
        {user ? (
          <>
            {!user.email ? (
              <Group justify="space-between">
                <Text c="white" size="lg" fw={700}>
                  Tickets Manager App
                </Text>
              </Group>
            ) : (
              <Group w="100%" justify="space-between">
                <Link href="/home" style={{ textDecoration: "none" }}>
                  <Text c="white" size="lg" fw={800}>
                    Tickets Manager App
                  </Text>
                </Link>
                <Group gap={10}>
                  <Text c="white">{user.email}</Text>
                  <Menu>
                    <MenuTarget>
                      <UnstyledButton>
                        <UserAvatar url={url?.avatar_url} />
                      </UnstyledButton>
                    </MenuTarget>
                    <MenuDropdown>
                      <Link href="/account" style={{ textDecoration: "none" }}>
                        <MenuItem>Account</MenuItem>
                      </Link>
                      <form action="/auth/signout" method="POST">
                        <MenuItem type="submit">Sign out</MenuItem>
                      </form>
                    </MenuDropdown>
                  </Menu>
                </Group>
              </Group>
            )}
          </>
        ) : (
          <Group justify="space-between" w="100%">
            <Link href="/" style={{ textDecoration: "none" }}>
              <Text c="white" size="lg" fw={800}>
                Tickets Manager App
              </Text>
            </Link>
            <Group>
              <Anchor href="/login">Login</Anchor>
              <Anchor href="/about">About</Anchor>
            </Group>
          </Group>
        )}
      </Flex>
    </Box>
  );
}
