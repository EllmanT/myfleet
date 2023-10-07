import axios from "axios";
import { server } from "server";

export const createVehicle = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "loadVehicleCreateRequest",
    });
    const config = { Headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/vehicle/create-vehicle`,
      newForm,
      config
    );
    dispatch({
      type: "loadVehicleCreateSuccess",
      payload: data.vehicle,
    });
  } catch (error) {
    dispatch({
      type: "loadVehicleCreateFailed",
      payload: error.response.data.message,
    });
  }
};

export const getAllVehiclesCompany = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllVehiclesCompanyRequest",
    });

    const { data } = await axios.get(
      `${server}/vehicle/get-all-vehicles-company`,
      { withCredentials: true }
    );
    dispatch({
      type: "getAllVehiclesCompanySuccess",
      action: data.vehicles,
    });
  } catch (error) {
    dispatch({
      type: "getAllVehiclesCompanyFailed",
      action: error.response.data.message,
    });
  }
};
