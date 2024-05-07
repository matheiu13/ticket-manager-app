import { Button, Container, Group, Title } from "@mantine/core";
import { readUserSession } from "../actions";
import { redirect } from "next/navigation";
import DisplayTickets from "../components/DisplayTickets/DisplayTickets";
export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { data } = await readUserSession();
  if (!data.user) {
    return redirect("/");
  }
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "5";
  // console.log(page);
  
  return (
    <Container>
      <Group>
        <Title>Home page</Title>
        <form action="/auth/signout" method="POST">
          <Button type="submit">Sign Out</Button>
        </form>
      </Group>
      {/* <AddFormTest /> */}
      {/* <AddForm />
      <DisplayForms /> */}
      <DisplayTickets pages={{page, per_page}} />
    </Container>
  );
}
