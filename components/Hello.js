import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct, setProducts } from "../store/productsSlice";

export const Hello = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const db = SQLite.openDatabase("products.db");

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price INTEGER)",
      );
    });
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM products", [], (_, { rows }) => {
        const data = rows._array;
        dispatch(setProducts(data));
      });
    });
  }, []);

  const handleAddProduct = () => {
    if (!name || !price) {
      Alert.alert("Error", "Please enter both a name and a price.");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO products (name, price) VALUES (?, ?)",
        [name, price],
        (_, { insertId }) => {
          dispatch(
            addProduct({
              id: insertId,
              name: name,
              price: price,
            }),
          );
        },
      );
    });
  };
  const handleDeleteProduct = (id) => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM products WHERE id = ?", [id], (_, result) => {
        if (result.rowsAffected > 0) {
          dispatch(deleteProduct(id));
        }
      });
    });
  };

  return (
    <>
      <FlatList
        data={products}
        style={styles.container}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text key={item.id} style={styles.item}>
              {item.name} | {item.price}$
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDeleteProduct(item.id)}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <StatusBar style="auto" />
      <View style={styles.amountContainer}>
        <TextInput onChangeText={setName} placeholder="Name" />
        <TextInput
          keyboardType="numeric"
          onChangeText={setPrice}
          placeholder="Price"
        />
        <TouchableOpacity
          style={styles.purchaseButton}
          onPress={() => handleAddProduct()}
        >
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
    paddingHorizontal: 20,
    width: "100%",
  },
  itemContainer: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 5,
    margin: 5,
    padding: 10,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  amountContainer: {
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  purchaseButton: {
    backgroundColor: "lightgreen",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },

  item: {
    margin: 0,
    padding: 10,
    fontSize: 18,
    color: "#000",
  },
  text: {
    width: 100,
    fontSize: 48,
  },
  button: {
    color: "white",
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 10,
  },
});

export default Hello;
