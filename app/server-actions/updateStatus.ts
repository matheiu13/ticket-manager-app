"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateStatus(id: any, status: any) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.log("User is not authenticated to add a form.");
    return;
  }

  if (!status) {
    console.log("checked");
    try {
      const {data, error} = await supabase.from("tickets").update({status: "approved"}).eq("ticket_id", id);
      if(error){
          alert("approving failed");
      }
    } catch (error) {
      alert("Error approving ticket!");
    }
  } else {
    console.log("unchecked");
    try {
      const {data, error} = await supabase.from("tickets").update({status: "pending"}).eq("ticket_id", id);
      if(error){
          alert("approving failed");
      }
    } catch (error) {
      alert("Error approving ticket!");
    }
  }
  revalidatePath("/home");
  return { message: "Success" };
}
