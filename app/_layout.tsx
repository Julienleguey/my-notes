import { Stack } from "expo-router";
import React, { Suspense, useEffect, createContext, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import * as schema from "@/db/schema";
import DeleteButton from "@/components/core/DeleteButton/DeleteButton";
import { NoteContext } from "@/components/contexts/contexts";

export const DATABASE_NAME = "notesDb";

// https://www.youtube.com/watch?v=AT5asDD3u_A
// or https://orm.drizzle.team/docs/get-started/expo-new
// change the schema and generate migrations with: npx drizzle-kit generate
// const expoDb = openDatabaseSync(DATABASE_NAME, { enableChangeListener: true });

export default function RootLayout() {
  const expoDb = openDatabaseSync(DATABASE_NAME);

  const db = drizzle(expoDb, { schema });
  const { success, error } = useMigrations(db, migrations);
  const [currentNoteId, setCurrentNoteId] = useState<number | null>(null);

  useEffect(() => {
    if (success) {
      console.log({ success });
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      console.log({ error });
    }
  }, [error]);

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{
          enableChangeListener: true, // doesn't work with update and delete somehow
          // enableChangeListener: false,
        }}
        useSuspense
      >
        <NoteContext.Provider value={{ currentNoteId, setCurrentNoteId }}>
          <Stack>
            <Stack.Screen
              name="index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="note"
              options={{
                title: "Note",
                // headerRight: () => <DeleteButton />,
              }}
            />
            <Stack.Screen
              name="about"
              options={{ title: "About" }}
            />
          </Stack>
        </NoteContext.Provider>
      </SQLiteProvider>
    </Suspense>
  );
}
