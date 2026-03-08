import axios from "axios";
import type { Note } from "@/types/note";
const baseURL = "https://notehub-public.goit.study/api";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export type NoteId = Note["id"];

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

interface settingProps {
  params: {
    page: number;
    search: string;
    perPage: number;
    tag?: string;
  };

  headers: { Authorization: string };
}

interface createNoteProps {
  noteData: {
    title: string;
    content: string | null;
    tag: string;
  };
}

export const fetchNotes = async (
  mysearchtext: string,
  page: number,
  tag: string,
) => {
  const setting: settingProps = {
    params: {
      page,
      search: mysearchtext,
      perPage: 12,
      ...(tag.toLowerCase() !== "all" ? { tag } : {}),
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get<NotesResponse>(`${baseURL}/notes`, setting);

  return data;
};

export const createNote = async ({ noteData }: createNoteProps) => {
  const { data } = await axios.post<Note>(`${baseURL}/notes`, noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deleteNote = async (id: NoteId) => {
  const { data } = await axios.delete<Note>(`${baseURL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const fetchNoteById = async (id: NoteId) => {
  const { data } = await axios.get<Note>(`${baseURL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
