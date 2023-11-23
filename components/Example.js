import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

const Example = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  useEffect(() => {
    const fetchProducts = () => {
      const unsubscribe = firestore()
        .collection("Products")
        .onSnapshot((snapshot) => {
          const productsList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProducts(productsList);
        });

      return () => unsubscribe();
    };

    fetchProducts();
  }, []);
  const addProduct = async () => {
    try {
      const newProduct = {
        name: productName,
        price: productPrice,
      };
      await firestore().collection("Products").add(newProduct);
      setProductName("");
      setProductPrice("");
      setProducts([...products, newProduct]);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteProdcut = async (productId) => {
    try {
      await firestore().collection("Products").doc(productId).delete();
      const querySnapshot = await firestore().collection("Products").get();
      const tempProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(tempProducts);
    } catch {
      console.error(error);
    }
  };

  return (
    <>
      <FlatList
        data={products}
        style={styles.container}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text key={item.id} style={styles.item}>
              {item.name} | {item.price}$
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => deleteProdcut(item.id)}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <StatusBar style="auto" />
      <View style={styles.amountContainer}>
        <TextInput
          onChangeText={setProductName}
          value={productName}
          placeholder="Name"
        />
        <TextInput
          keyboardType="numeric"
          onChangeText={setProductPrice}
          value={productPrice}
          placeholder="Price"
        />
        <TouchableOpacity
          style={styles.purchaseButton}
          onPress={() => addProduct()}
        >
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Example;
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
