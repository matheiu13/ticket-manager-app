import createSupabaseServerClient from "@/utils/supabase/server";
import Link from "next/link";
import { Box, Card, Container, Text } from "@mantine/core";
import EditTicket from "./EditTicket";

type TicketValues = {
  ticket_name: string;
  ticket_description: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export default async function page({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("tickets")
    .select("*")
    .eq("ticket_id", params.id).single();

  function formatDate(dateString: string): string {
    if (dateString == null) return "";
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
  return (
    <Container>
      <Link href="/home">
        <b>Go back</b>
      </Link>
      <EditTicket ticket={data}/>
    </Container>
  );
}
