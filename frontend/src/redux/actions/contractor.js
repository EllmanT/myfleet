import axios from "axios";
import { server } from "server";

export const createContractor = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "loadContractorCreateRequest",
    });

    const config = { Headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/contractor/create-contractor`,
      newForm,
      config
    );

    dispatch({
      type: "loadContractorCreateSuccess",
      payload: data.contractor,
    });
  } catch (error) {
    dispatch({
      type: "loadContractorCreateFailed",
      payload: error.response.data.message,
    });
  }
};
