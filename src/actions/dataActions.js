const table = (result) => {
  return {
    type: "TABLE",
    payload: result,
  };
};

const bar = (result) => {
  return {
    type: "BAR",
    payload: result,
  };
};

const pie = (result) => {
  return {
    type: "PIE",
    payload: result,
  };
};

export default {
  table,
  bar,
  pie,
};
