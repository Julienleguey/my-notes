import React, { useState, useContext } from "react";
import { Alert, Pressable, StyleSheet, ViewStyle } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { notes } from "@/db/schema";
import * as schema from "@/db/schema";
import { PRIMARY, PRIMARY_DARK } from "@/utils/constants";
import PlusSvg from "@/components/svgs/GarbageSvg";
import { WHITE } from "@/utils/constants";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { NoteContext } from "@/components/contexts/contexts";

const styles = StyleSheet.create<{ btnDelete: ViewStyle; pressed: ViewStyle }>({
  btnDelete: {
    backgroundColor: PRIMARY,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  pressed: {
    backgroundColor: PRIMARY_DARK,
  },
});

function DeleteButton() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const noteContext = useContext(NoteContext);
  const currentNoteId = noteContext?.currentNoteId || null;

  console.log({ currentNoteId });

  const router = useRouter();
  // const { id } = useLocalSearchParams<{
  //   id?: string;
  // }>();

  // it  won't work! We need to use context (or a store like Redux)
  // const { id } = useLocalSearchParams();

  // console.log({ id });

  const [pressed, setPressed] = useState(false);

  function onPressIn() {
    setPressed(true);
  }

  function onPressOut() {
    setPressed(false);
    openDeleteAlert();
  }

  function goBack() {
    router.back();
  }

  async function deleteNote() {
    try {
      console.log("Deleting note:", currentNoteId);
      if (!currentNoteId) return;

      console.log("Deleting note BIS:", currentNoteId);

      await drizzleDb.delete(notes).where(eq(notes.id, currentNoteId));
      goBack();
    } catch (error) {
      console.error("Error deleting note:", error);
      goBack();
    }
  }

  function openDeleteAlert() {
    console.log("Open delete alert");
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: deleteNote,
      },
    ]);
  }

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      // https://github.com/expo/expo/issues/29489
      // onPress={openDeleteAlert}
      style={[styles.btnDelete, pressed && styles.pressed]}
    >
      <PlusSvg fill={WHITE} />
    </Pressable>
  );
}

export default DeleteButton;
