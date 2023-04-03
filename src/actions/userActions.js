const setUser = (token) => {
  return {
    type: "SET_USER",
    payload: token,
  };
};

export default {
  setUser,
};
