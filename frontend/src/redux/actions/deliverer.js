import axios from "axios";
import {server} from "../../server"

export const createDeliverer = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "delivererCreateRequest",
    });

    const config = { Headers: { "Content-type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/deliverer/create-deliverer`,
      newForm,
      config
    );

    dispatch({
      type: "createDelivererSuccess",
      payload: data.deliverer,
    });
  } catch (error) {
    dispatch({
      type: "delivererCreateFailed",
      payload: error.response.data.message,
    });
  }
};
