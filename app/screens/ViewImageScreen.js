import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function ViewImageScreen(props) {
  return (
    <View style={styles.imageContainer}>
      <MaterialCommunityIcons
        color="white"
        name="close"
        size={35}
        style={[styles.closeIcon, styles.icon]}
      />
      <MaterialCommunityIcons
        color="white"
        name="trash-can-outline"
        size={35}
        style={[styles.deleteIcon, styles.icon]}
      />
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require("../assets/chair.jpg")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
  },

  closeIcon: {
    top: 40,
    left: 30,
  },

  deleteIcon: {
    top: 40,
    right: 30,
  },

  image: {
    height: "100%",
    width: "100%",
  },

  imageContainer: {
    backgroundColor: colors.black,
    flex: 1,
  },
});

export default ViewImageScreen;
