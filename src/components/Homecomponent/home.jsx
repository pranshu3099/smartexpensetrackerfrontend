import { authmethod, userData, bearer } from "../../utils/utils";
import Transaction from "../transaction/transaction";
import RecentTransaction from "../transaction/RecentTransaction";
import { useEffect, useState } from "react";
import "./home.css";
import plus from "../../icons/plus-square-svgrepo-com.svg";
import down from "../../icons/arrow-bottom-icon.svg";
import up from "../../icons/arrow-top-icon.svg";
import analytics from "../../icons/analytics-svgrepo-com.svg";
import useCommonEffect from "../../customhook/useCommonEffect";
import AllTransaction from "../transaction/AllTransaction";
import Analytics from "../Analytics/MyAnalytics";
import { useDisclosure } from "@chakra-ui/react";
import { Modal, Button } from "@chakra-ui/react";
import { getMonthAndYear, GetMonthlyExpenseData } from "../../utils/utils";
const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [AllTransactionModal, setAllTransactionModal] = useState(false);
  const [seeAnalytics, setseeAnalytics] = useState(false);
  const [spending, setSpending] = useState(false);
  const [yourTransaction, SetyourTransaction] = useState([]);
  const { month, year } = getMonthAndYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await useCommonEffect.getExpenseData(userData?.email);
        SetyourTransaction(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userData?.email]);

  const analyticsData = useCommonEffect.fetchAnalyticsData(
    userData?.id,
    month,
    year
  );

  useEffect(() => {
    if (analyticsData?.length > 0) {
      const { total_spending } = GetMonthlyExpenseData(analyticsData);
      setSpending(total_spending);
    }
  }, [analyticsData]);

  const getTimeofDay = () => {
    const now = new Date();
    const hours = now.getHours();
    if (hours >= 0 && hours < 12) {
      return "Good Morning";
    } else if (hours >= 12 && hours < 18) {
      return "Good Afternoon";
    }
    return "Good Evening";
  };

  const handleopenModal = () => {
    onOpen();
  };

  const handleSeeAllTransactionModal = () => {
    onOpen();
    setAllTransactionModal(true);
  };
  const handleAnalyticsModal = () => {
    onOpen();
    setseeAnalytics(true);
  };

  return (
    <>
      <div className="home-main-container">
        <div className="name-date-container">
          <p>{getTimeofDay()} </p>
          <h2>{userData?.name}</h2>
        </div>
        <div className="gain-loss-container">
          <div className="gain-loss-sub-container">
            <img src={down} alt="" style={{ width: "80px" }} />
            <div className="spend-data">
              <p>Spending</p>
              <p>{spending}</p>
            </div>
          </div>
          <div className="analytics-container">
            <img
              src={plus}
              alt=""
              className="home-icon"
              onClick={handleopenModal}
            />
            <img
              src={analytics}
              alt=""
              className="home-icon"
              onClick={handleAnalyticsModal}
            />
          </div>

          <div className="gain-loss-sub-container">
            <img src={up} alt="" style={{ width: "80px" }} />
            <div className="gain-data">
              <p>Income</p>
              <p>2.5</p>
            </div>
          </div>
        </div>

        <div className="transaction">
          {!AllTransactionModal && !seeAnalytics && (
            <Modal isOpen={isOpen} onClose={onClose}>
              <Transaction onClose={onClose} />
            </Modal>
          )}
        </div>
        <div>
          {seeAnalytics && (
            <Modal isOpen={isOpen} onClose={onClose}>
              <Analytics onClose={onClose} setseeAnalytics={setseeAnalytics} />
            </Modal>
          )}
        </div>
        <div className="recent-transaction">
          <p style={{ color: "black" }}>Recent Transaction</p>
          <Button
            style={{
              backgroundColor: "black",
              color: "white",
              width: "100px",
              padding: "20px",
            }}
            onClick={handleSeeAllTransactionModal}
          >
            See All
          </Button>
          {AllTransactionModal && (
            <Modal isOpen={isOpen} onClose={onClose}>
              <AllTransaction
                onClose={onClose}
                setAllTransactionModal={setAllTransactionModal}
              />
            </Modal>
          )}
        </div>
        {yourTransaction.length ? (
          <RecentTransaction yourTransaction={yourTransaction} />
        ) : null}
      </div>
    </>
  );
};

export default Home;
