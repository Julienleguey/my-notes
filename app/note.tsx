import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import { notes } from "@/db/schema";
import * as schema from "@/db/schema";
import Note from "@/types/noteType";
import { BACKGROUND_BASE } from "@/utils/constants";
import TextNoteUpdate from "@/components/notes/TextNoteUpdate";
import ListNoteUpdate from "@/components/notes/ListNoteUpdate";
import TextNoteCreation from "@/components/notes/TextNoteCreation";
import ListNoteCreation from "@/components/notes/ListNoteCreation";
import TextNote from "@/components/notes/TextNote";
import { NoteContext } from "@/components/contexts/contexts";

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

const emptyTextNote: Note = {
  title: "",
  content: "",
  type: "textNote",
};

export default function NoteScreen() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  // const { id, creationType } = useLocalSearchParams<{
  //   id?: string;
  //   creationType?: string;
  // }>();

  const creationType = "textNote";

  const noteContext = useContext(NoteContext);
  const currentNoteId = noteContext?.currentNoteId || null;
  const id = currentNoteId ? currentNoteId.toString() : undefined;
  // const parsedId = id ? parseInt(id, 10) : undefined;
  // const { data: note } = parsedId !== undefined ? useLiveQuery(drizzleDb.query.notes.findFirst({ where: eq(notes.id, parsedId) })) : { data: null };

  // console.log("params", id, creationType);

  const { data: initialNote } = id ? useLiveQuery(drizzleDb.query.notes.findFirst({ where: eq(notes.id, parseInt(id, 10)) })) : { data: emptyTextNote };
  // const { data: initialNote } = { data: emptyTextNote };

  // const sanitizedNote = initialNote ? { ...initialNote, content: initialNote.content ?? undefined } : emptyTextNote;

  // console.log("initialNote", initialNote);

  const [note, setNote] = useState<Note>({
    id: initialNote?.id,
    title: initialNote?.title || "",
    content: initialNote?.content || "",
    type: initialNote?.type || "textNote",
  });

  useEffect(() => {
    async function initializeNoteState() {
      setNote({
        id: initialNote?.id,
        title: initialNote?.title || "",
        content: initialNote?.content || "",
        type: initialNote?.type || "textNote",
      });
    }

    initializeNoteState();
  }, [id, initialNote?.id]);

  // console.log("note IS: ", note);

  function handleTitleChange(text: string) {
    setNote((prevNote) => ({
      ...prevNote,
      title: text,
    }));
  }

  function handleContentChange(text: string) {
    setNote((prevNote) => ({
      ...prevNote,
      content: text,
    }));
  }

  async function createNote() {
    try {
      console.log("Creating note:", note);
      const res = await drizzleDb.insert(notes).values(note).returning();
      console.log("Note created with id:", res);
      setNote({ ...note, id: res[0].id });
    } catch (err) {
      console.log("Error creating note:", err);
    }
  }

  async function updateNote() {
    if (!note.id) {
      console.log("No note ID found");
      return;
    }

    try {
      console.log("Updating note:", note);
      const res = await drizzleDb.update(notes).set(note).where(eq(notes.id, note.id)).returning();
      console.log("Note updated:", res);
    } catch (err) {
      console.log("Error updating note:", err);
    }
  }

  async function onSave() {
    if (note.id) {
      await updateNote();
    } else {
      await createNote();
    }
  }

  // if (id) {
  //   const { data: note } = useLiveQuery(drizzleDb.query.notes.findFirst({ where: eq(notes.id, parseInt(id, 10)) }));
  //   console.log("note", note);

  //   switch (note?.type) {
  //     case "textNote":
  //       return <TextNoteUpdate initialNote={note} />;
  //     case "listNote":
  //       return <ListNoteUpdate initialNote={note} />;
  //     default:
  //       return (
  //         <View style={styles.main}>
  //           <Text>On ne devrait pas voir ça!!!</Text>
  //         </View>
  //       );
  //   }
  // }

  switch (note.type) {
    case "textNote":
      // return <TextNoteCreation />;
      return (
        <TextNote
          note={note}
          handleTitleChange={handleTitleChange}
          handleContentChange={handleContentChange}
          onSave={onSave}
        />
      );
    case "listNote":
      return <ListNoteCreation />;
    default:
      return (
        <View style={styles.main}>
          <Text>On ne devrait pas voir ça!!!</Text>
        </View>
      );
  }

  return null;
}
