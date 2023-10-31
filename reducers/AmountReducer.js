const defaultState = 0;

const amountReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "UPDATE_TOTAL_AMOUNT":
      return {
        ...state,
        totalAmount: action.total,
      };
    default:
      return state;
  }
};

export default amountReducer;
