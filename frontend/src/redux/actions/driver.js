import axios from "axios";
import { server } from "server";

export const createDriver = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "loadCreateDriverRequest",
    });

    const config = { Headers: { "Content-Type": "multipart/form-data" } };
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
//load the drivers for the company
export const loadAllDriversCompany = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllDriversCompanyRequest",
    });

    const { data } = await axios.post(
      `${server}/vehicle/get-all-drivers-company/${id}`
    );
    dispatch({
      type: "getAllDriversCompanySuccess",
      payload: data.vehicles,
    });
  } catch (error) {
    dispatch({
      type: "loadAllDriversCompanyFailed",
      payload: error.response.data.message,
    });
  }
};
