import { useEffect, useState } from "react";
import axios from "axios";
const react_api_url = import.meta.env.VITE_REACT_APP_API_URL;
const getExpenseData = async (email) => {
  try {
    const response = await axios.get(
      `${react_api_url}/v1/user/getexpensedata/${email}`
    );
    if (response.status === 200) {
      return response?.data?.getData;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default getExpenseData;
