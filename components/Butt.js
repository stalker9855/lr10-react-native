import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Butt = () => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.value);
  console.log(value);

  const Increment = () => {
    dispatch({ type: "INCREMENT", value: 1 });
  };

  return (
    <View style={styles.container}>
      <Text>{value}</Text>
      <Button title="Increment" onPress={Increment} />
      <Button
        title="Decrement"
        onPress={() => dispatch({ type: "DECREMENT" })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Butt;
