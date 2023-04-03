export const tableData = (state = 1, action) => {
  switch (action.type) {
    case "TABLE":
      return action.payload;
    default:
      return state;
  }
};

export const barData = (state = 1, action) => {
  switch (action.type) {
    case "BAR":
      return action.payload;
    default:
      return state;
  }
};

export const pieData = (state = 1, action) => {
  switch (action.type) {
    case "PIE":
      return action.payload;
    default:
      return state;
  }
};
