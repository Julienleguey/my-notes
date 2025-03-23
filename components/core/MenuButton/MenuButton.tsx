import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomText from "../CustomText/CustomText";
import { LIGHT, LIGHTER, PRIMARY, PRIMARY_DARK, WHITE } from "@/utils/constants";

type MenuButtonProps = {
  onPress: () => void;
  children: string;
};

const styles = StyleSheet.create({
  btnCreate: {
    backgroundColor: WHITE,
    width: 120,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: LIGHT,
    borderBottomWidth: 1,
  },
  btnCreatePressed: {
    backgroundColor: LIGHTER,
  },
  leftBar: {
    backgroundColor: PRIMARY,
    height: "100%",
    width: 4,
  },
  leftBarPressed: {
    backgroundColor: PRIMARY_DARK,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 12,
  },
});

function MenuButton({ onPress, children }: MenuButtonProps) {
  const [pressed, setPressed] = useState(false);

  function onPressIn() {
    setPressed(true);
  }

  function onPressOut() {
    setPressed(false);
  }

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      style={[styles.btnCreate, pressed && styles.btnCreatePressed]}
    >
      <View style={[styles.leftBar, pressed && styles.leftBarPressed]} />
      <View style={styles.content}>
        <CustomText>{children}</CustomText>
      </View>
    </Pressable>
  );
}

export default MenuButton;
