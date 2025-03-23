import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { PRIMARY, PRIMARY_DARK } from "@/utils/constants";
import PlusSvg from "@/components/svgs/PlusSvg";
import { ViewStyle } from "react-native";
import { WHITE } from "@/utils/constants";

type AddButtonProps = {
  onPress: () => void;
  style?: ViewStyle;
};

const styles = StyleSheet.create<{ btnCreate: ViewStyle; pressed: ViewStyle }>({
  btnCreate: {
    backgroundColor: PRIMARY,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  pressed: {
    backgroundColor: PRIMARY_DARK,
  },
});

function AddButton({ style, onPress }: AddButtonProps) {
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
      style={[styles.btnCreate, pressed && styles.pressed, style]}
    >
      <PlusSvg fill={WHITE} />
    </Pressable>
  );
}

export default AddButton;
