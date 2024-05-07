"use client";
import { Button, Group, Pagination } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaginationControls({ length }: { length: number | null }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "5";
  return (
    <div>
      <Group>
        <Pagination
          total={Math.ceil(length! / Number(per_page))}
          onPreviousPage={() => {
            router.push(`/home/?page=${Number(page) - 1}&per_page=${per_page}`);
          }}
          value={Number(page)}
          onNextPage={() => {
            router.push(`/home/?page=${Number(page) + 1}&per_page=${per_page}`);
          }}
          onChange={(page) => {
            router.push(`/home/?page=${Number(page)}&per_page=${per_page}`);
          }}
        />
      </Group>
    </div>
  );
}
