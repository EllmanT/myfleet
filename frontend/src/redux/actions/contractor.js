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

export const getAllContractorsDeliverer = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllContrDelReq",
    });
    const { data } = await axios.get(
      `${server}/contractor/get-all-contractors-deliverer`,
      { withCredentials: true }
    );
    dispatch({
      type: "getAllContrDelSuccess",
      payload: data.contractors,
    });
  } catch (error) {
    dispatch({
      type: "getAllContrDelFailed",
      payload: error.response.data.message,
    });
  }
};
