import React from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "@/components/core/CustomText/CustomText";

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default function ListNoteCreation() {
  return (
    <View style={styles.main}>
      <CustomText>Création</CustomText>
    </View>
  );
}
