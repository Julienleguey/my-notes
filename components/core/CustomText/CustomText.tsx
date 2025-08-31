import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import { DARK } from "@/utils/constants";

type CustomTextProps = {
  children: string | undefined | null;
  style?: TextStyle;
};

const styles = StyleSheet.create({
  text: {
    color: DARK,
    fontSize: 16,
  },
});

function CustomText({ style, children }: CustomTextProps) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

export default CustomText;
