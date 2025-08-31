import React, { useEffect } from "react";
import { View, StyleSheet, TextInput, Keyboard } from "react-native";
import Note from "@/types/noteType";
import CustomText from "../core/CustomText/CustomText";
import { BLACK, DARK } from "@/utils/constants";

type TextNoteProps = {
  note: Note;
  handleTitleChange: (text: string) => void;
  handleContentChange: (text: string) => void;
  onSave: () => void;
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  titleInput: {
    backgroundColor: "lightblue",
    height: 48,
    fontSize: 24,
    color: BLACK,
  },
  contentInput: {
    // height: 40,
    backgroundColor: "lightgreen",
    // borderColor: "gray",
    // borderWidth: 1,
    fontSize: 18,
    color: DARK,
    flex: 1,
    // justifyContent: "flex-start",
    textAlignVertical: "top",
  },
});

export default function TextNote({ note, handleTitleChange, handleContentChange, onSave }: TextNoteProps) {
  function saveContent() {
    console.log("Saving content:", note);
    onSave();
  }

  useEffect(() => {
    const hideKeyboardListener = Keyboard.addListener("keyboardDidHide", () => {
      saveContent();
    });

    return () => {
      hideKeyboardListener.remove();
    };
  }, [note]);

  return (
    <View style={styles.main}>
      <TextInput
        style={styles.titleInput}
        placeholder="Title..."
        value={note.title}
        onChangeText={handleTitleChange}
      />
      <TextInput
        style={styles.contentInput}
        placeholder="Write here..."
        value={note.content ?? ""}
        onChangeText={handleContentChange}
        autoFocus
        multiline
      />
    </View>
  );
}
