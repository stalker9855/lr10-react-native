import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import app from "@react-native-firebase/app";
import firestore from "@react-native-firebase/firestore";
import { useEffect } from "react";
import Example from "./components/Example";
export default function App() {
  const fireBaseConfig = {
    apiKey: "AIzaSyC8YmSz6JfoV7Jc64nFlomWW3QPBCAZ4rs",
    authDomain: "lab12-c8186.firebaseapp.com",
    databaseURL: "https://lab12-c8186.firebaseio.com",
    projectId: "lab12-c8186",
    storageBucket: "lab12-c8186.appspot.com",
    messagingSenderId: "65362801055",
    appId: "1:65362801055:android:2a090c043bad98ecaa4daa",
  };
  if (!app.apps.length) {
    app.initializeApp(fireBaseConfig);
  }
  return (
    <View style={styles.container}>
      <Example />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
