import { authmethod, userData, bearer } from "../../utils/utils";
import Transaction from "../transaction/transaction";
import RecentTransaction from "../transaction/RecentTransaction";
import { useEffect, useState } from "react";
import plus from "../../icons/plus-square-svgrepo-com.svg";
import "./home.css";
import down from "../../icons/arrow-bottom-icon.svg";
import up from "../../icons/arrow-top-icon.svg";
import getExpenseData from "../../customhook/useCommonEffect";
import AllTransaction from "../transaction/AllTransaction";
import { useDisclosure } from "@chakra-ui/react";
import { Modal, Button } from "@chakra-ui/react";
const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [AllTransactionModal, setAllTransactionModal] = useState(false);
  const [yourTransaction, SetyourTransaction] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExpenseData(userData?.email);
        SetyourTransaction(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userData?.email]);

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
              <p>2.5</p>
            </div>
          </div>
          <img
            src={plus}
            alt=""
            className="plus-icon"
            onClick={handleopenModal}
          />
          <div className="gain-loss-sub-container">
            <img src={up} alt="" style={{ width: "80px" }} />
            <div className="gain-data">
              <p>Income</p>
              <p>2.5</p>
            </div>
          </div>
        </div>

        <div className="transaction">
          {!AllTransactionModal && (
            <Modal isOpen={isOpen} onClose={onClose}>
              <Transaction onClose={onClose} />
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
        <RecentTransaction yourTransaction={yourTransaction} />
      </div>
    </>
  );
};

export default Home;
