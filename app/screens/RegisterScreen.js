import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";

import ActivityIndicator from "../components/ActivityIndicator";
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../components/forms";
import authApi from "../api/auth";
import Screen from "../components/Screen";
import usersApi from "../api/users";
import useApi from "../api/useApi";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen(props) {
  const [error, setError] = useState();
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);

  const auth = useAuth();

  const handleSubmit = async (userInfo) => {
    try {
      const response = await registerApi.request(userInfo);
      if (!response.ok) {
        if (response.data) setError(response.data.error);
        else {
          setError("An unexpected error occured.");
        }
        return;
      }
      const { data: authToken } = await loginApi.request(
        userInfo.email,
        userInfo.password
      );
      auth.login(authToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={styles.container}>
        <AppForm
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <AppFormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="name"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="email"
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Register" />
        </AppForm>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;

// Firebase Implementation
// import React, { useState } from "react";
// import { StyleSheet, View } from "react-native";
// import * as Yup from "yup";

// import Screen from "../components/Screen";
// import {
//   AppForm,
//   AppFormField,
//   ErrorMessage,
//   SubmitButton,
// } from "../components/forms";
// import Auth from "../api/Auth";
// import useApi from "../api/useApi";
// import useAuth from "../auth/useAuth";
// import ActivityIndicator from "../components/ActivityIndicator";

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required().label("Name"),
//   email: Yup.string().required().email().label("Email"),
//   password: Yup.string().required().min(4).label("Password"),
// });

// function RegisterScreen(props) {
//   const [error, setError] = useState();
//   const registerApi = useApi(Auth.register);
//   const loginApi = useApi(Auth.login);

//   const auth = useAuth();

//   const handleSubmit = async (userInfo) => {
//     const response = await registerApi.request(userInfo);
//     if (!response.ok) {
//       if (response.data) setError(response.data.error.message);
//       else {
//         setError("An unexpected error occured.");
//         console.log(result);
//       }
//       return;
//     }
//     const result = await loginApi.request(userInfo.email, userInfo.password);
//     auth.login(result.data.idToken);
//   };

//   return (
//     <>
//       <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
//       <Screen style={styles.container}>
//         <AppForm
//           initialValues={{ name: "", email: "", password: "" }}
//           onSubmit={handleSubmit}
//           validationSchema={validationSchema}
//         >
//           <ErrorMessage error={error} visible={error} />
//           <AppFormField
//             autoCorrect={false}
//             icon="account"
//             name="name"
//             placeholder="name"
//           />
//           <AppFormField
//             autoCapitalize="none"
//             autoCorrect={false}
//             icon="email"
//             keyboardType="email-address"
//             name="email"
//             placeholder="email"
//             textContentType="emailAddress"
//           />
//           <AppFormField
//             autoCapitalize="none"
//             autoCorrect={false}
//             icon="lock"
//             name="password"
//             placeholder="password"
//             secureTextEntry
//             textContentType="password"
//           />
//           <SubmitButton title="Register" />
//         </AppForm>
//       </Screen>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//   },
// });

// export default RegisterScreen;
