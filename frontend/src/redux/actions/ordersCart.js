export const addToOrdersCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "addToOrdersCart",
    payload: data,
  });
  localStorage.setItem("ordersCartItems", JSON.stringify(getState().cart.cart));
  return data;
};

export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromOrdersCart",
    payload: data._id,
  });
  localStorage.setItem("orderCartIrems", JSON.stringify(getState().cart.cart));
  return data;
};
