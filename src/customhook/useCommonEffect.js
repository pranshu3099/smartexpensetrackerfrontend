import { useEffect, useState } from "react";
import axios from "axios";
import {
  getMonthAndYear,
  months,
  GetMonthlyExpenseData,
  category_name,
} from "../utils/utils";
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

const fetchAnalyticsData = (id, month, year) => {
  const [analyticsData, setAnalyticsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${react_api_url}/v1/user/monthly-expenses/${id}/${year}/${month}`
      );
      const result = await response.json();
      setAnalyticsData(result);
    };
    fetchData();
  }, [id, month, year]);
  return analyticsData?.data;
};

export default { getExpenseData, fetchAnalyticsData };
