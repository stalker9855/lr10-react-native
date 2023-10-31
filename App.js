import { StatusBar } from "expo-status-bar";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import Cryptolist from "./components/Cryptolist";
import { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./reducers";
import Butt from "./components/Butt";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Cryptolist />
        <StatusBar style="auto" />
      </View>
    </Provider>
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
