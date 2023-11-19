import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import AppText from "./AppText";

function Cards({ imageUrl, onPress, subTitle, thumbnail, title }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image
          preview={{ uri: thumbnail }}
          style={styles.image}
          tint="light"
          uri={imageUrl}
        />
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.subTitle}>{subTitle}</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
  },

  detailsContainer: {
    padding: 20,
  },

  image: {
    height: 200,
    width: "100%",
  },

  subTitle: {
    color: colors.secondary,
    fontWeight: 300,
  },

  title: {
    marginBottom: 7,
  },
});

export default Cards;
