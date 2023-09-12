import axios from "axios";
import { server } from "server";

export const createCustomer = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "loadCustomerCreateRequest",
    });

    const  config  = { Headers: { "Content-Type": "multipart/formdata" } };

    const { data } = await axios.post(
      `${server}/customer/create-customer`,
      newForm,
      config
    );
    dispatch({
      type: "loadCustomerCreateSuccess",
      payload: data.customer,
    });
  } catch (error) {
    dispatch({
      type: "loadCustomerCreateFailed",
      payload: error.response.data.message,
    });
  }
};
