import React, { useState, useRef, useEffect, useContext, useCallback } from "react";
import { Text, View, StyleSheet, Pressable, ScrollView, StatusBar } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Link, useFocusEffect, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { addDummyData } from "@/db/addDummyData";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import * as schema from "@/db/schema";
import { DbNote } from "@/db/schema";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import AddButton from "@/components/core/AddButton";
import MenuButton from "@/components/core/MenuButton";
import NoteTile from "@/components/core/NoteTile";
import { BACKGROUND_BASE, BLACK } from "@/utils/constants";
import CustomText from "@/components/core/CustomText/CustomText";
import { NoteContext } from "@/components/contexts/contexts";
// import { notes } from "@/db/schema";
// import { eq } from "drizzle-orm";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: BACKGROUND_BASE,
  },
  notesListContainer: {
    flex: 1,
  },
  notesListContent: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    gap: 8,
    // backgroundColor: "pink",
  },
  overlay: {
    display: "none",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  overlayOpen: {
    display: "flex",
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
    zIndex: 3,
  },
  createMenu: {
    position: "absolute",
    bottom: 64,
    right: 0,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 120,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
    color: BLACK,
  },
});

export default function Index() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  // useDrizzleStudio(db); // nice to have but makes the app crash
  const router = useRouter();

  // const [tasks, setTasks] = useState<Task[]>([]);
  const [createMenuOpen, setCreateMenuOpen] = useState(false);

  // async function createDummyData() {
  //   try {
  //     await addDummyData(drizzleDb);

  //     console.log("done");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // async function updateNote() {
  //   const note = await drizzleDb.query.notes.findFirst();
  //   console.log("1");

  //   try {
  //     if (note) {
  //       // Update the note
  //       await drizzleDb.update(notes).set({ title: "bla" }).where(eq(notes.id, note.id)); // Use the note's ID to update the correct record

  //       console.log("2");
  //     } else {
  //       console.log("No note found to update.");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // const { data: tasks } = useLiveQuery(drizzleDb.query.tasks.findMany());
  // BUG: creating a note and coming back, the notes are updated
  // but going to an existing note, then creating a new note and coming back, the list is not updated
  // and also updating an existing note does not refresh the list
  const { data: notes } = useLiveQuery(drizzleDb.query.notes.findMany());

  // const [notes, setNotes] = useState<DbNote[]>([]);

  // useFocusEffect(
  //   useCallback(() => {
  //     console.log("Screen was focused");

  //     async function getNotes() {
  //       try {
  //         console.log("Getting notes !!!!!!!!!!!!!!!!!!!!!!!!");
  //         // Fetch notes from the database
  //         const notesRes = await drizzleDb.query.notes.findMany();
  //         console.log("Fetched notes:", notesRes);
  //         setNotes(notesRes);
  //       } catch (error) {
  //         console.error("Error fetching notes:", error);
  //       }
  //     }

  //     getNotes();
  //   }, [])
  // );

  console.log("notes length", notes.length);

  const noteContext = useContext(NoteContext);

  if (!noteContext) return null;

  const { setCurrentNoteId } = noteContext;

  // console.log({ tasks });

  // async function showDummyData() {
  //   const res = await drizzleDb.query.tasks.findMany();
  //   console.log({ res });
  //   setTasks(res);
  // }

  async function toggleCreateMenu() {
    console.log("Add button pressed");
    // await drizzleDb.insert(schema.notes).values({ title: "Note 1" });
    setCreateMenuOpen(!createMenuOpen);
  }

  function updateNote(noteId: number) {
    console.log("Update note", noteId);
    // go to note screen with params action: "update", id: noteId
    setCurrentNoteId(noteId);
    // router.push(`/note?id=${noteId}`);
    router.push(`/note`);
  }

  function createTextNote() {
    console.log("Create note");
    // go to note screen with params action: "create", type: "textNote"
    // router.push("/note?creationType=textNote");
    setCurrentNoteId(null);
    router.push("/note");
    setCreateMenuOpen(false);
  }

  function createListNote() {
    console.log("Create list");
    router.push("/note?creationType=listNote");
    setCreateMenuOpen(false);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.main}
        edges={["top"]}
      >
        <ScrollView
          style={styles.notesListContainer}
          contentContainerStyle={styles.notesListContent}
        >
          <CustomText style={styles.title}>My Notes</CustomText>

          {notes?.map((note: DbNote) => (
            <NoteTile
              key={note.id}
              onPress={() => updateNote(note.id)}
            >
              {note.title}
            </NoteTile>
          ))}
        </ScrollView>

        <Pressable
          style={{ ...styles.overlay, ...(createMenuOpen && styles.overlayOpen) }}
          onPress={toggleCreateMenu}
        />

        <View style={styles.addButtonContainer}>
          {createMenuOpen && (
            <View style={styles.createMenu}>
              <MenuButton onPress={createTextNote}>Create note</MenuButton>
              <MenuButton onPress={createListNote}>Create list</MenuButton>
            </View>
          )}

          <AddButton onPress={toggleCreateMenu} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
