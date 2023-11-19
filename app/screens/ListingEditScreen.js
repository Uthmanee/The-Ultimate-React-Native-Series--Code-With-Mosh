import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import listingsAPI from "../api/listings";
import useLocation from "../hooks/useLocation";
import UploadScreen from "../components/UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

function ListingEditScreen(props) {
  const [progress, setProgress] = useState(0);
  const [uploadVisible, setUploadVisible] = useState(false);

  const location = useLocation();

  // const formData = (listing) => {
  //   const data = new FormData();

  //   data.append("title", listing.title);
  //   data.append("price", listing.price);
  //   data.append("category", listing.category.value);
  //   data.append("description", listing.description);
  //   data.append("location", { location });

  //   listing.images.forEach((image, index) => {
  //     data.append("images", {
  //       name: "image" + index,
  //       type: "image/jpeg",
  //       uri: image,
  //     });
  //   });
  //   return data;
  // };

  const handleSubmit = async (listing, { resetForm }) => {
    try {
      // setProgress(0);
      setUploadVisible(true);
      const result = await listingsAPI.addListing(
        { ...listing, location },
        (progress) => setProgress(progress)
      );
      console.log(result);

      // const data = formData(listing);
      // console.log(data);
      // const details = Object.fromEntries(data._parts);
      // console.log(details);

      // const result = await fetch(
      //   "https://donewithit-server-default-rtdb.firebaseio.com/listingz.json",
      //   {
      //     method: "POST",
      //     body: JSON.stringify(details),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // console.log(result);

      if (!result.ok) {
        setUploadVisible(false);
        alert("Could not upload listing");
        return;
      }
    } catch (error) {
      console.log(error.message);
    }
    resetForm();
  };

  return (
    <Screen style={styles.screen}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <AppForm
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormImagePicker name="images" />
        <AppFormField name="title" placeholder="Title" />
        <AppFormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <AppFormPicker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Categories"
          width="50%"
        />
        <AppFormField
          maxLength={255}
          multiline
          name="description"
          numberOfLine={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
  },
});

export default ListingEditScreen;
