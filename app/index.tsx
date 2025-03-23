import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { addDummyData } from "@/db/addDummyData";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import * as schema from "@/db/schema";
import { Note } from "@/db/schema";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import AddButton from "@/components/core/AddButton";
import MenuButton from "@/components/core/MenuButton";
import { BACKGROUND_BASE } from "@/utils/constants";
// import { notes } from "@/db/schema";
// import { eq } from "drizzle-orm";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACKGROUND_BASE,
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
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
});

export default function Index() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  useDrizzleStudio(db);

  // const [tasks, setTasks] = useState<Task[]>([]);
  const [createMenuOpen, setCreateMenuOpen] = useState(false);

  async function createDummyData() {
    try {
      await addDummyData(drizzleDb);

      console.log("done");
    } catch (err) {
      console.log(err);
    }
  }

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
  const { data: notes } = useLiveQuery(drizzleDb.query.notes.findMany());

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

  function createNote() {
    console.log("Create note");
  }

  function createList() {
    console.log("Create list");
  }

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     console.log("click", menuRef.current, event.target);
  //     if (menuRef.current && !menuRef.current.contains(event.target)) {
  //       setCreateMenuOpen(false); // Close the menu if the click is outside
  //     }
  //   };

  //   // Add event listener
  //   document.addEventListener("mousedown", handleClickOutside);

  //   // Clean up event listener
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <View style={styles.main}>
      {notes?.map((note: Note) => <Text key={note.id}>{note.title}</Text>)}

      <View style={styles.addButtonContainer}>
        {createMenuOpen && (
          <View style={styles.createMenu}>
            <MenuButton onPress={createNote}>Create note</MenuButton>
            <MenuButton onPress={createList}>Create list</MenuButton>
          </View>
        )}

        <AddButton onPress={toggleCreateMenu} />
      </View>
    </View>
  );
}
