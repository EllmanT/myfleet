import axios from "axios";
import { server } from "server";

export const createContractor = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "loadCreateContractorRequest",
    });

    const config = { Headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/contractor/create-contractor`,
      newForm,
      config
    );

    dispatch({
      type: "loadCreateContractorSuccess",
      payload: data.contractor,
    });
  } catch (error) {
    dispatch({
      type: "loadCreateContractorFailed",
      payload: error.response.data.message,
    });
  }
};
