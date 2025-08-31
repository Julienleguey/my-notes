import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "@/components/core/CustomText/CustomText";
import { DbNote } from "@/db/schema";
import Note from "@/types/noteType";

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default function ListNoteUpdate({ initialNote }: { initialNote: DbNote }) {
  console.log("initialNote", initialNote);

  const [note, setNote] = useState<Note>({
    id: initialNote.id,
    title: initialNote.title,
    content: initialNote.content || "",
  });

  return (
    <View style={styles.main}>
      <CustomText>{note.title}</CustomText>
    </View>
  );
}
