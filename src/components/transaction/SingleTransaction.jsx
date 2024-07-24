import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { getDate, getTimeStamp, getImage } from "../../utils/utils";
const SingleTransaction = ({ singleTransactionData, onClose }) => {
  return (
    <>
      <ModalOverlay />
      <ModalContent bg="white" height="800px">
        <ModalBody>
          <>
            {singleTransactionData.map((data, index) => {
              return (
                <div className="single-transaction-main-container" key={index}>
                  <div className="date-time-container">
                    <div className="date-container">
                      <img src={getImage("time")} alt="" />
                      <p>{getDate(data?.timeStamp)}</p>
                    </div>
                    <div className="time-container">
                      <img src={getImage("date")} alt="" />
                      <p>{getTimeStamp(data?.timeStamp)}</p>
                    </div>
                  </div>
                  <div className="single-data-main-container">
                    <div className="single-data-container">
                      <img src={getImage("rupees")} alt="" />
                      <div className="single-data-sub-container">
                        <p>Amount</p>
                        <p>{data?.amount}</p>
                      </div>
                    </div>
                  </div>
                  <div className="single-data-main-container">
                    <div className="single-data-container">
                      <img src={getImage(data?.category)} alt="" />
                      <div className="single-data-sub-container">
                        <p>Category</p>
                        <p>{data?.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="single-data-main-container">
                    <div className="single-data-container">
                      <img src={getImage(data?.payment_mode)} alt="" />
                      <div className="single-data-sub-container">
                        <p>Payment mode</p>
                        <p>{data?.payment_mode}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalBody>
      </ModalContent>
    </>
  );
};

export default React.memo(SingleTransaction);
