import axios from "axios";
import { server } from "server";

export const createDriver = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "loadCreateDriverRequest",
    });

    const config = { Headers: { "Content-type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/driver/create-driver`,
      newForm,
      config
    );

    dispatch({
      type: "loadCreateDriverSuccess",
      payload: data.driver,
    });
  } catch (error) {
    dispatch({
      type: "loadCreateDriverFailed",
      payload: error.response.data.message,
    });
  }
};
