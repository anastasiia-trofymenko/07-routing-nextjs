"use client";

import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNotes } from "@/lib/api";
import { useDebouncedCallback } from "use-debounce";

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [debouncedSearch] = useDebounce(search, 300);

  const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 500);

  const handleSearch = (value: string) => {
    setPage(1);
    debouncedSetSearchQuery(value);
  };

  // const toggleModal = () => setIsModalOpen((prev) => !prev);

  const { data, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: ["notes", search, page, tag],
    queryFn: () => fetchNotes(search, page, tag),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />

        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={(selected) => {
              if (!isPlaceholderData) {
                setPage(selected);
              }
            }}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}
      {isError && <p>Something went wrong. Please try again.</p>}

      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
