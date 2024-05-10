import React from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  Group,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from "@mantine/core";
import createSupabaseServerClient from "@/utils/supabase/server";
import StatusApprover from "./StatusApprover";
import PaginationControls from "./PaginationControls";
import AddTicket from "../AddTicket/AddTicket";
import DeleteTicket from "../DeleteTicket/DeleteTicket";
import Link from "next/link";

export default async function DisplayTickets({
  pages,
  user,
}: {
  pages: { [key: string]: string | string[] | undefined };
  user: string | null;
}) {
  // start pagination formula
  const page = pages["page"];
  const per_page = pages["per_page"];
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page) - 1;
  // console.log("start:", start);
  // console.log("end:", end);

  // end pagination formula
  const supabase = createSupabaseServerClient();
  const {
    count,
    data: tickets,
    error,
  } = await supabase
    .from("tickets")
    .select(`*, ticket_status(status)`, { count: "exact" })
    .order("updated_at", { ascending: false })
    .range(start, end);

  if (error) {
    console.log("Error fetching forms");
  } else {
    // console.log(count);
    // console.log(tickets);
  }
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
    <Box>
      <Group justify="space-between" my={10}>
        <PaginationControls length={count} />
        <AddTicket />
      </Group>
      <Table>
        <TableThead>
          <TableTr>
            <TableTh></TableTh>
            <TableTh>ID</TableTh>
            <TableTh>Created At</TableTh>
            <TableTh>Updated At</TableTh>
            <TableTh>Ticket</TableTh>
            <TableTh>Status</TableTh>
            <TableTh>Actions</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {tickets?.map((ticket, index) => {
            return (
              <TableTr key={index}>
                <TableTd key={ticket.ticket_id}>
                  {user == "admin" && (
                    <StatusApprover
                      id={ticket.ticket_id}
                      status={ticket.ticket_status.status}
                    />
                  )}
                </TableTd>
                <TableTd>
                  <Box w="10vw">{ticket.ticket_id}</Box>
                </TableTd>
                <TableTd>{formatDate(ticket.created_at)}</TableTd>
                <TableTd>{formatDate(ticket.updated_at)}</TableTd>
                <TableTd>{ticket.ticket_name}</TableTd>
                <TableTd>
                  {ticket.ticket_status.status == "pending" ? (
                    <Badge color="orange" variant="outline">
                      {ticket.ticket_status.status}
                    </Badge>
                  ) : (
                    <Badge color="green" variant="outline">
                      {ticket.ticket_status.status}
                    </Badge>
                  )}
                </TableTd>
                <TableTd>
                  <Flex gap={10}>
                    <Link href={`/ticket/${ticket.ticket_id}`}>
                      <Button size="sm">View</Button>
                    </Link>
                    <DeleteTicket ticketID={ticket.ticket_id} />
                  </Flex>
                </TableTd>
              </TableTr>
            );
          })}
        </TableTbody>
      </Table>
    </Box>
  );
}
