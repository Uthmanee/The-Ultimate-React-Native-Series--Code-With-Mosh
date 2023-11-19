import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Cards from "../components/Cards";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../api/useApi";

function ListingsScreen({ navigation }) {
  const {
    data: listings,
    error,
    loading,
    request: loadListings,
  } = useApi(listingsApi.getListings);

  useEffect(() => {
    loadListings();
  }, []);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        {error && (
          <>
            <AppText>Couldn't connect</AppText>
            <AppButton onPress={loadListings}>Retry</AppButton>
          </>
        )}
        <FlatList
          data={listings}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Cards
              imageUrl={item.images[0].url}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
              subTitle={`$${item.price}`}
              thumbnail={item.images.thumbnailUrl}
              title={item.title}
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

// Implementation with firebase
// function ListingsScreen({ navigation }) {
//   const {
//     data: listings,
//     error,
//     loading,
//     request: loadListings,
//   } = useApi(listingsApi.getListings);

//   useEffect(() => {
//     loadListings();
//   }, []);

//   return (
//     <>
//       <ActivityIndicator visible={loading} />
//       <Screen style={styles.screen}>
//         {error && (
//           <>
//             <AppText>Couldn't connect</AppText>
//             <AppButton>Retry</AppButton>
//           </>
//         )}
//         <FlatList
//           data={listings}
//           keyExtractor={(listing) => listing.id.toString()}
//           renderItem={({ item }) => (
//             <Cards
//               imageUrl={item.images.url}
//               onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
//               subTitle={`$${item.price}`}
//               thumbnail={item.images.thumbnailUrl}
//               title={item.title}
//             />
//           )}
//         />
//       </Screen>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {
//     padding: 20,
//     backgroundColor: colors.light,
//   },
// });

export default ListingsScreen;
