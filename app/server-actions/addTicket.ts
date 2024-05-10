"use server";
import createSupabaseServerClient from "@/utils/supabase/server";
import { TicketValues } from "../components/AddTicket/AddTicket";
import { revalidatePath } from "next/cache";

export async function addTicket(formData: TicketValues) {
  const supabase = createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.log("User is not authenticated to delete a form.");
    return;
  } else {
    console.log(user.id);
    
  }

  // const { data } = await supabase.auth.getSession();

  // if (data) {
  //   console.log(data);
  // }

  const { data, error } = await supabase.from("tickets").insert({
    ticket_name: formData.ticketName,
    ticket_description: formData.ticketDescription,
    user_id: user.id
  });
  if (error) {
    console.error("Error inserting data: ", error);
  } 
  revalidatePath("/home");

  return { message: "Success" };
}
