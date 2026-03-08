import axios from "axios";
import type { Note } from "@/types/note";

const axiosInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  search: string;
  page: number;
  tag?: string;
}

//get
export const fetchNotes = async (search: string, page: number, tag: string) => {
  const response = await axiosInstance.get<FetchNotesResponse>("/notes", {
    params: {
      page: page,
      search: search,
      perPage: 12,
      ...(tag.toLowerCase() !== "all" ? { tag } : {}),
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await axiosInstance.get<Note>(`/notes/${id}`);
  return res.data;
};

//post
export const createNote = async (
  newNote: Omit<Note, "id" | "createdAt" | "updatedAt">,
): Promise<Note> => {
  const response = await axiosInstance.post<Note>("/notes", newNote);
  return response.data;
};

export const deleteNote = async (id: Note["id"]): Promise<Note> => {
  const response = await axiosInstance.delete<Note>(`/notes/${id}`);
  return response.data;
};
