import React from "react";
import { Text, StyleSheet } from "react-native";
import { DARK } from "@/utils/constants";

type CustomTextProps = {
  children: string;
};

const styles = StyleSheet.create({
  text: {
    color: DARK,
    fontSize: 16,
  },
});

function CustomText({ children }: CustomTextProps) {
  return <Text style={styles.text}>{children}</Text>;
}

export default CustomText;
