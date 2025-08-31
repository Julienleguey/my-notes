import { createContext } from "react";

interface NoteContextType {
  currentNoteId: number | null;
  setCurrentNoteId: (id: number | null) => void;
}

export const NoteContext = createContext<NoteContextType | null>(null);
