import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("products.db");
const handleAddProduct = (products, setProducts) => {
  const randomProductName = "Ringo";
  const randomProductPrice = 100;
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO products (name, price) VALUES (?, ?)",
      [randomProductName, randomProductPrice],
      (_, { insertId }) => {
        setProducts([
          ...products,
          {
            id: insertId,
            name: randomProductName,
            price: randomProductPrice,
          },
        ]);
      },
    );
  });
};

export default handleAddProduct;
