import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "@/components/core/CustomText/CustomText";
import { DbNote } from "@/db/schema";
import Note from "@/types/noteType";

type TextNoteUpdateProps = {
  initialNote: DbNote;
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default function TextNoteUpdate({ initialNote }: TextNoteUpdateProps) {
  console.log("initialNote", initialNote);

  const [note, setNote] = useState<Note>({
    id: initialNote.id,
    title: initialNote.title,
    content: initialNote.content || "",
    type: "textNote",
  });

  return (
    <View style={styles.main}>
      <CustomText>Update</CustomText>
      <CustomText>{note.title}</CustomText>
      <CustomText>{note.content}</CustomText>
    </View>
  );
}
