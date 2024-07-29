import {
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import { userData } from "../../utils/utils";
import { useEffect, useState } from "react";
import {
  getMonthAndYear,
  months,
  GetMonthlyExpenseData,
  category_name,
} from "../../utils/utils";
import "chart.js/auto";
import "./Analytics.css";
import { Pie, Bar } from "react-chartjs-2";
const react_api_url = import.meta.env.VITE_REACT_APP_API_URL;
const MyAnalytics = ({ onClose, setseeAnalytics }) => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [expenseData, setexpenseData] = useState([]);
  const [categoryData, setcategoryData] = useState([]);
  useEffect(() => {
    const { month, year } = getMonthAndYear();
    const fetchData = async () => {
      const response = await fetch(
        `${react_api_url}/v1/user/monthly-expenses/${userData?.id}/${year}/${month}`
      );
      const result = await response.json();
      setAnalyticsData(result?.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (analyticsData.length > 0) {
      const { expense_result, category_result } =
        GetMonthlyExpenseData(analyticsData);
      setexpenseData(expense_result);
      setcategoryData(category_result);
    }
  }, [analyticsData]);
  const handleclose = () => {
    onClose();
    setseeAnalytics(false);
  };
  return (
    <>
      <ModalOverlay />
      <ModalContent width="1800px" maxWidth="1800px" height="800px">
        <ModalBody>
          <h1>Your Monthly Analytics</h1>
          <div className="chart-container">
            <div>
              <Bar
                className="chart"
                data={{
                  labels: months,
                  datasets: [
                    {
                      label: "Monthly expense data",
                      data: expenseData,
                      backgroundColor: [
                        "rgba(54,162,235,1)",
                        "rgba(255,159,64,1)",
                        "rgba(255,206,86,1)",
                        "rgba(255,159,64,1)",
                        "rgba(54,162,235,1)",
                        "rgba(255,206,86,1)",
                        "#fffc40",
                        "rgba(54,162,235,1)",
                        "rgba(255,206,86,1)",
                        "rgba(255,159,64,1)",
                        "rgba(54,162,235,1)",
                        "rgba(255,206,86,1)",
                      ],
                    },
                  ],
                }}
              />
            </div>
            <div>
              <Pie
                className="chart"
                data={{
                  labels: category_name,
                  datasets: [
                    {
                      label: "Catergory",
                      data: categoryData,
                      backgroundColor: [
                        "rgba(54,162,235,1)",
                        "#ffa04090",
                        "#56ffb9",
                        "#dfff40",
                        "#eb3636",
                        "#5cff56",
                        "#fffc40",
                        "#eb3691",
                        "#7256ff",
                        "#ff8940",
                      ],
                    },
                  ],
                }}
              />
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleclose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default MyAnalytics;
