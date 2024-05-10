import { Button, Container, Group, Title } from "@mantine/core";

import { redirect } from "next/navigation";
import createSupabaseServerClient from "@/utils/supabase/server";
import DisplayTickets from "@/app/components/DisplayTickets/DisplayTickets";
import { readUserSession } from "@/app/(auth)/actions";
export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createSupabaseServerClient();
  const { data } = await readUserSession();
  if (!data.user) {
    return redirect("/");
  }
  const user_id = data.user.id;
  const { data: user_role } = await supabase
    .from("user")
    .select("role")
    .eq("id", user_id).single();
  // console.log(user_role);
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "5";
  // console.log(page);

  return (
    <Container>
      {/* <AddFormTest /> */}
      {/* <AddForm />
      <DisplayForms /> */}
      <DisplayTickets pages={{ page, per_page }} user={user_role?.role} />
    </Container>
  );
}
