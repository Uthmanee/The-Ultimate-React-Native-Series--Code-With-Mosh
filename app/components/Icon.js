import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Icon({
  backgroundColor = "#000",
  iconColor = "#fff",
  name,
  size = 40,
}) {
  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor,
        borderRadius: size / 2,
        height: size,
        justifyContent: "center",
        width: size,
      }}
    >
      <MaterialCommunityIcons color={iconColor} name={name} size={size / 2} />
    </View>
  );
}

export default Icon;
