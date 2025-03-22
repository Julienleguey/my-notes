import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { addDummyData } from "@/db/addDummyData";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import * as schema from "@/db/schema";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { notes } from "@/db/schema";
import { eq } from "drizzle-orm";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "cyan",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
  btnCreate: {
    backgroundColor: "pink",
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginTop: 16,
  },
  btnShow: {
    backgroundColor: "purple",
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginTop: 16,
  },
});

// type Task = {
//   id: number;
//   name: string;
// };

export default function Index() {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  useDrizzleStudio(db);

  // const [tasks, setTasks] = useState<Task[]>([]);

  async function createDummyData() {
    await addDummyData(drizzleDb);

    console.log("done");
  }

  async function updateNote() {
    const note = await drizzleDb.query.notes.findFirst();
    console.log("1");

    try {
      if (note) {
        // Update the note
        await drizzleDb.update(notes).set({ title: "bla" }).where(eq(notes.id, note.id)); // Use the note's ID to update the correct record

        console.log("2");
      } else {
        console.log("No note found to update.");
      }
    } catch (err) {
      console.log(err);
    }
  }

  // const { data: tasks } = useLiveQuery(drizzleDb.query.tasks.findMany());

  // console.log({ tasks });

  // async function showDummyData() {
  //   const res = await drizzleDb.query.tasks.findMany();
  //   console.log({ res });
  //   setTasks(res);
  // }

  return (
    <View style={styles.main}>
      <Text>Sup bitches</Text>
      <Link
        href="/about"
        style={styles.button}
      >
        Go to About screen
      </Link>

      <Pressable
        onPress={createDummyData}
        style={styles.btnCreate}
      >
        <Text>Create dummy data</Text>
      </Pressable>

      {/* <Pressable
        onPress={showDummyData}
        style={styles.btnShow}
      >
        <Text>Show dummy data</Text>
      </Pressable> */}

      <Pressable
        onPress={updateNote}
        style={styles.btnShow}
      >
        <Text>update note</Text>
      </Pressable>

      {/* {tasks?.map((task: Task) => <Text key={task.id}>{task.name}</Text>)} */}
    </View>
  );
}
