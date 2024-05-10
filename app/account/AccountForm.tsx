"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import {
  Anchor,
  Button,
  Card,
  Center,
  Container,
  Flex,
  TextInput,
} from "@mantine/core";
import UpdateAvatar from "./avatar";

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    fullname,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Center>
        <Card shadow="sm" padding="lg" withBorder w="50vw">
          <UpdateAvatar
            uid={user?.id ?? null}
            url={avatar_url}
            size={150}
            onUpload={(url) => {
              setAvatarUrl(url);
              updateProfile({ fullname, username, avatar_url: url });
            }}
          />
          <TextInput
            label="Email"
            id="email"
            type="text"
            value={user?.email}
            disabled
          />
          <TextInput
            label="Full name"
            id="fullName"
            type="text"
            value={fullname || ""}
            onChange={(e) => setFullname(e.target.value)}
          />
          <TextInput
            label="Username"
            id="username"
            type="text"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Flex justify="flex-end" w="100%" mt={10}>
            <Button
              onClick={() => updateProfile({ fullname, username, avatar_url })}
              disabled={loading}
              size="sm"
              color="green"
            >
              {loading ? "Loading ..." : "Update"}
            </Button>
          </Flex>
        </Card>
      </Center>
      <br />
      {!fullname && (
        <Center>
          <form action="/auth/signout" method="post">
            <Anchor type="submit">Sign out</Anchor>
          </form>
        </Center>
      )}
    </Container>
  );
}
