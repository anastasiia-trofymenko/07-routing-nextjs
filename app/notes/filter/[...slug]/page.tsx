import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

import NotesClient from "./Notes.client";
export const dynamic = "force-dynamic";

export default async function NotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const resolvedParams = await params;
  const queryClient = new QueryClient();
  const activeTag = resolvedParams.slug?.[0] || "all";
  const apiTag = activeTag === "all" ? "" : activeTag;

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, activeTag],
    queryFn: () => fetchNotes("", 1, apiTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={activeTag} />
    </HydrationBoundary>
  );
}
