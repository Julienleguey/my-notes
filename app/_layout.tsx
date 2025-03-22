import { Stack } from "expo-router";
import React, { Suspense, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { SQLiteProvider, openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import * as schema from "@/db/schema";

export const DATABASE_NAME = "tasks";

const expoDb = openDatabaseSync(DATABASE_NAME);
const db = drizzle(expoDb, { schema });

// https://www.youtube.com/watch?v=AT5asDD3u_A
// or https://orm.drizzle.team/docs/get-started/expo-new
// change the schema and generate migrations with: npx drizzle-kit generate

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (success) {
      console.log({ success });
    }
  }, [success]);

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <Stack>
          <Stack.Screen
            name="index"
            options={{ title: "Home" }}
          />
          <Stack.Screen
            name="about"
            options={{ title: "About" }}
          />
        </Stack>
      </SQLiteProvider>
    </Suspense>
  );
}
