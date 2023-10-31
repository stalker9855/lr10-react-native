import { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default Cryptolist = () => {
  const dispatch = useDispatch();
  const crypto = useSelector((state) => state.cryptoReducer);
  const totalAmount = useSelector((state) => state.amountReducer.totalAmount);
  useEffect(() => {
    const newTotalAmount = crypto.reduce(
      (total, item) => total + item.amount * item.value,
      0,
    );
    dispatch({ type: "UPDATE_TOTAL_AMOUNT", total: newTotalAmount });
  }, [crypto, dispatch]);
  const AddAmount = (id) => {
    dispatch({ type: "ADD_AMOUNT", id });
  };
  const RemoveAmount = (id) => {
    dispatch({ type: "REMOVE_AMOUNT", id });
  };
  headerComponent = () => {
    return (
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 2,
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "white",
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 18,
          }}
        >
          Crypto shop
        </Text>
      </View>
    );
  };
  return (
    <>
      <FlatList
        ListHeaderComponent={headerComponent}
        style={styles.container}
        data={crypto}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.item}>{item.title}</Text>
            <Text style={styles.item}>{item.value}</Text>
            <TouchableOpacity
              onPress={() => RemoveAmount(item.id)}
              style={styles.button}
            >
              <Text>-</Text>
            </TouchableOpacity>
            <Text style={styles.item}>{item.amount}</Text>
            <TouchableOpacity
              onPress={() => AddAmount(item.id)}
              style={styles.button}
            >
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.amountContainer}>
        <Text>Price: {totalAmount} </Text>
        <TouchableOpacity style={styles.purchaseButton}>
          <Text>Purchase</Text>
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
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
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
