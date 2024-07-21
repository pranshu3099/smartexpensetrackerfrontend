import { authmethod, userData, bearer } from "../../utils/utils";
import Transaction from "../transaction/transaction";
import RecentTransaction from "../transaction/RecentTransaction";
import { useEffect, useState } from "react";
import plus from "../../icons/plus-square-svgrepo-com.svg";
import "./home.css";
import down from "../../icons/arrow-bottom-icon.svg";
import up from "../../icons/arrow-top-icon.svg";
import axios from "axios";
const react_api_url = import.meta.env.VITE_REACT_APP_API_URL;
const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [yourTransaction, SetyourTransaction] = useState([]);
  useEffect(() => {
    try {
      axios
        .get(`${react_api_url}/v1/user/getexpensedata/${userData.email}`)
        .then((response) => {
          if (response.status === 200) {
            SetyourTransaction(response?.data?.getData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

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
        <RecentTransaction yourTransaction={yourTransaction} />
      </div>
    </>
  );
};

export default Home;
