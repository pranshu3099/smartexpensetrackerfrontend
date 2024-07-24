import { Button, useDisclosure } from "@chakra-ui/react";
import SingleTransaction from "./SingleTransaction";
import React from "react";
import { useState } from "react";
import { Modal } from "@chakra-ui/react";
import { getDate, getImage } from "../../utils/utils";
const Main = ({ TransactionData }) => {
  const [singleTransactionData, setSingleTransactionData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getSingleTransactionData = (id) => {
    const data = TransactionData.filter((data) => {
      return data?._id === id;
    });

    setSingleTransactionData(data);
    onOpen();
  };

  return (
    <>
      <div className="recent-transaction-container">
        <div className="recent-transaction-sub-container">
          {TransactionData.map((data, index) => {
            return (
              <div
                key={data?._id || index}
                className="transaction-data-container"
                onClick={() => {
                  getSingleTransactionData(data?._id);
                }}
              >
                <div>
                  <img
                    src={getImage(data?.category)}
                    alt=""
                    style={{ width: "45px" }}
                  />
                </div>
                <div className="amount-message">
                  <p style={{ color: "black" }}>₹ {data?.amount}</p>
                  <p>{data?.message}</p>
                </div>
                <div className="time-payment">
                  <p>{getDate(data?.timeStamp)}</p>
                  <img
                    src={getImage(data?.payment_mode)}
                    alt=""
                    style={{ width: "45px" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {
        <Modal isOpen={isOpen} onClose={onClose}>
          <SingleTransaction
            singleTransactionData={singleTransactionData}
            onClose={onClose}
          />
        </Modal>
      }
    </>
  );
};

export default Main;
