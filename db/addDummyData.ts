// import { lists, tasks } from "@/db/schema";
import { notes } from "@/db/schema";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";

// export async function addDummyData(db: ExpoSQLiteDatabase) {
//   await db.insert(lists).values([{ name: "List 1" }, { name: "List 2" }, { name: "List 3" }]);

//   await db.insert(tasks).values([
//     { name: "Task 1", list_id: 1 },
//     { name: "Task 2", list_id: 1 },
//     { name: "Task 3", list_id: 1 },
//   ]);

//   await db.insert(tasks).values([
//     { name: "Task 1", list_id: 2 },
//     { name: "Task 2", list_id: 2 },
//     { name: "Task 3", list_id: 2 },
//   ]);

//   await db.insert(tasks).values([
//     { name: "Task 1", list_id: 3 },
//     { name: "Task 2", list_id: 3 },
//     { name: "Task 3", list_id: 3 },
//   ]);
// }

export async function addDummyData(db: ExpoSQLiteDatabase) {
  await db.insert(notes).values([{ title: "Note 1" }, { title: "Note 2" }, { title: "Note 3" }]);
}
