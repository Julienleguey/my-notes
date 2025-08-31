import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "@/components/core/CustomText/CustomText";
import { DbNote, notes } from "@/db/schema";
import * as schema from "@/db/schema";
import Note from "@/types/noteType";
import TextNote from "@/components/notes/TextNote";
import { useSQLiteContext } from "expo-sqlite/build/hooks";
import { drizzle } from "drizzle-orm/expo-sqlite/driver";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "pink",
  },
});

export default function TextNoteCreation() {
  const db = useSQLiteContext();
  // const drizzleDb = drizzle(db, { schema: { notes } });
  const drizzleDb = drizzle(db, { schema });

  const [note, setNote] = useState<Note>({
    title: "",
    content: "",
    type: "textNote",
  });

  async function createNote() {
    try {
      console.log("Creating note:", note);
      const res = await drizzleDb.insert(notes).values(note).returning();
      console.log("Note created with id:", res);
    } catch (err) {
      console.log("Error creating note:", err);
    }
  }

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

  console.log({ note });

  return (
    <View style={styles.main}>
      <TextNote
        note={note}
        handleTitleChange={handleTitleChange}
        handleContentChange={handleContentChange}
        onSave={createNote}
      />
    </View>
  );
}
