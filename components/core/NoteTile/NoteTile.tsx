import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomText from "../CustomText/CustomText";
import { LIGHT, LIGHTER, PRIMARY, PRIMARY_DARK, WHITE } from "@/utils/constants";

type NoteTileProps = {
  onPress: () => void;
  children: string;
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: WHITE,
    width: "100%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: LIGHT,
    borderBottomWidth: 1,
  },
  btnPressed: {
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

function NoteTile({ onPress, children }: NoteTileProps) {
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
      style={[styles.btn, pressed && styles.btnPressed]}
    >
      <View style={[styles.leftBar, pressed && styles.leftBarPressed]} />
      <View style={styles.content}>
        <CustomText>{children}</CustomText>
      </View>
    </Pressable>
  );
}

export default NoteTile;
