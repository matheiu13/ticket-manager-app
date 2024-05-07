"use client";
import { createClient } from "@/utils/supabase/client";
import { Checkbox, Loader } from "@mantine/core";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { updateStatus } from "@/app/server-actions/updateStatus";

export default function StatusApprover({
  id,
  status,
}: {
  id: any;
  status: any;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [approving, setAprroving] = useState(false);
  const [approve, setApprove] = useState<boolean>(false);

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setAprroving(true);
    await updateStatus(id, approve);
    setAprroving(false);
  };

  useEffect(() => {
    // console.log("your id", id);
    // console.log("your status", status);
    if (status == "approved") {
      setApprove(true);
    }
  }, [status]);
  return (
    <div>
      {!approving ? (
        <Checkbox
          checked={approve}
          onChange={(event) => {
            setApprove(event.currentTarget.checked);
            // console.log(approve);
            handleOnChange(event);
          }}
        />
      ) : (
        <Loader size="sm" color="blue" />
      )}
    </div>
  );
}
