"use client";
import { addTicket } from "@/app/server-actions/addTicket";
import { Box, Button, Modal, Stack, TextInput, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "react-hook-form";

export type TicketValues = {
  ticketName: string;
  ticketDescription: string;
};
export default function AddTicket() {
  const [opened, { open, close }] = useDisclosure(false);
  const { register, handleSubmit, reset } = useForm<TicketValues>();
  const onSubmit = (data: TicketValues) => {
    addTicket(data);
    console.log("your data: ", data);
    reset();
    close();
  };
  return (
    <Box>
      <Button onClick={open}>Add Ticket</Button>
      <Modal opened={opened} onClose={close} title="Add a Ticket">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextInput
              label="Ticket Name"
              placeholder="Example Ticket"
              {...register("ticketName")}
              required
            />
            <Textarea
              label="Ticket Description"
              placeholder="Example Description"
              resize="vertical"
              {...register("ticketDescription")}
              required
            />
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
}
