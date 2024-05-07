"use client";
import { updateTicket } from "@/app/server-actions/updateTicket";
import { Button, Card, Text, TextInput, Textarea } from "@mantine/core";
import { useForm } from "react-hook-form";
export type TicketValues = {
  ticket_name: string;
  ticket_description: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  ticket_id: string;
};
export default function EditTicket({ ticket }: { ticket: TicketValues }) {
  const { register, handleSubmit, reset } = useForm<TicketValues>();
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
  const onSubmit = (data: TicketValues) => {
    data.ticket_id = ticket.ticket_id;
    updateTicket(data);
    reset();
    close();
  };
  return (
    <Card>
      <Text>
        Ticket ID:&nbsp;<b>{ticket.ticket_id}</b>
      </Text>
      <Text>Created At:&nbsp;{formatDate(ticket.created_at)}</Text>
      <Text>Last Update:&nbsp;{formatDate(ticket.updated_at)}</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Ticket Name"
          defaultValue={ticket.ticket_name}
          {...register("ticket_name")}
        />
        <Textarea
          label="Ticket Description"
          defaultValue={ticket.ticket_description}
          {...register("ticket_description")}
        />
        <Text>Created by user:&nbsp;{ticket?.user_id}</Text>
        <Button type="submit">Update Ticket</Button>
      </form>
    </Card>
  );
}
