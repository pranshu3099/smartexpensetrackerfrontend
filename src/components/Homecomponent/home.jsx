import { authmethod, userData, bearer } from "../../utils/utils";
import Transaction from "../transaction/transaction";
import { useEffect, useState } from "react";
import plus from "../../icons/plus-square-svgrepo-com.svg";
import "./home.css";
import { useDisclosure } from "@chakra-ui/react";
import down from "../../icons/arrow-bottom-icon.svg";
import up from "../../icons/arrow-top-icon.svg";
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
          {openModal && (
            <Transaction isOpen={openModal} setOpenModal={setOpenModal} />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
