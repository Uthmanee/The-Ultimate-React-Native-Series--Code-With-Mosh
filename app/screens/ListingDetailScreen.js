import React from "react";
import { Image } from "react-native-expo-image-cache";
import { View, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

import AppText from "../components/AppText";
import ContactSellerForm from "../components/ContactSellerForm";
import ListItem from "../components/ListItem";
import colors from "../config/colors";

function ListingDetailScreen({ route }) {
  const listing = route.params;
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <Image
        preview={{ uri: listing.images[0].thumbnailUrl }}
        uri={listing.images[0].url}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{listing.title}</AppText>
        <AppText style={styles.price}>${listing.price}</AppText>
      </View>
      <ListItem
        image={require("../assets/mosh.jpg")}
        title={"Mosh Hamedani"}
        subTitle={"5 Listings"}
      />
      <ContactSellerForm listing={listing} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    padding: 20,
  },

  image: {
    height: 300,
    width: "100%",
  },

  price: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 300,
    marginVertical: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "500",
  },
});

export default ListingDetailScreen;
