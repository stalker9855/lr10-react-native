const defualtState = [
  {
    id: 0,
    title: "Bitcoin",
    value: 1000,
    amount: 0,
  },
  {
    id: 1,
    title: "Etherium",
    value: 500,
    amount: 0,
  },
  {
    id: 2,
    title: "Dogecoin",
    value: 500,
    amount: 0,
  },
  {
    id: 3,
    title: "Coinweb",
    value: 500,
    amount: 0,
  },
  {
    id: 4,
    title: "Coincoin",
    value: 500,
    amount: 0,
  },
  {
    id: 5,
    title: "Altcoin",
    value: 500,
    amount: 0,
  },
  {
    id: 6,
    title: "AAAA",
    value: 1,
    amount: 0,
  },
];
const cryptoReducer = (state = defualtState, action) => {
  switch (action.type) {
    case "ADD_AMOUNT":
      return state.map((item) => {
        if (item.id == action.id) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
    case "REMOVE_AMOUNT":
      return state.map((item) => {
        if (item.id == action.id && item.amount > 0) {
          return { ...item, amount: item.amount - 1 };
        }
        return item;
      });
    default:
      return state;
  }
};

export default cryptoReducer;
