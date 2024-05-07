"use client";
import { Button } from "@mantine/core";
import { deleteTicket } from "@/app/server-actions/deleteTicket";
export default function DeleteTicket(ticketID: any) {
  return (
    <form action={()=>deleteTicket(ticketID)}>
      <Button color="red" type="submit" variant="outline">Delete</Button>
    </form>
  );
}
