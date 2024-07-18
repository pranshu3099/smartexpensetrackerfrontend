import { authmethod, userData, bearer } from "../../utils/utils";
import Transaction from "../transaction/transaction";
import { useEffect, useState } from "react";
import plus from "../../icons/plus-square-svgrepo-com.svg";
import "./home.css";
import { useDisclosure } from "@chakra-ui/react";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openModal, setOpenModal] = useState(false);
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
    setOpenModal(true);
  };

  return (
    <>
      <div className="home-main-container">
        <div className="name-date-container">
          <p>{getTimeofDay()} </p>
          <h2>{userData?.name}</h2>
        </div>

        {/* <div className="current-month-container">
          <p>This Month</p>
        </div> */}
        <div className="gain-loss-container">
          <button className="spend-button">
            <p>Spending</p>
            <p>2.5</p>
          </button>
          <img
            src={plus}
            alt=""
            className="plus-icon"
            onClick={handleopenModal}
          />
          <button className="income-button">
            <p>Income</p>
            <p>2.5</p>
          </button>
        </div>
        {openModal && (
          <Transaction isOpen={setOpenModal} setOpenModal={setOpenModal} />
        )}
      </div>
    </>
  );
};

export default Home;
