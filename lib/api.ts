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

interface FetchNotesParams {
  page: number;
  search: string;
}

//get
export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const response = await axiosInstance.get<FetchNotesResponse>("/notes", {
    params: {
      page: params.page,
      perPage: 12,
      search: params.search,
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
