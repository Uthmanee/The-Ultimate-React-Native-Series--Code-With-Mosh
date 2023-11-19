import React from "react";
import { Alert, Keyboard } from "react-native";
import * as Notifications from "expo-notifications";
import * as Yup from "yup";

import { AppForm, AppFormField, SubmitButton } from "./forms";
import messagesApi from "../api/messages";

function ContactSellerForm({ listing }) {
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    try {
      const result = await messagesApi.send(message, listing.id);
      if (!result.ok) {
        console.log("Error", result);
        return Alert.alert(
          "Error",
          "Could not send the message to the seller."
        );
      }
    } catch (error) {
      console.log(error);
    }

    resetForm();

    try {
      async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Awesome",
            body: "Your message was sent to the seller.",
            data: { data: "goes here" },
          },
          trigger: { seconds: 2 },
        });
      }
      schedulePushNotification();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppForm
      initialValues={{ message: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <AppFormField
        maxLength={255}
        multiline
        name="message"
        numberOfLines={3}
        placeholder="Message..."
      />
      <SubmitButton title="Contact Seller" />
    </AppForm>
  );
}

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

export default ContactSellerForm;
