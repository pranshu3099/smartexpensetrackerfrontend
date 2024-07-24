import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { authmethod, userData, bearer } from "../../utils/utils";
import getExpenseData from "../../customhook/useCommonEffect";
import Main from "./Main";
import { css } from "@emotion/react";
const AllTransaction = ({ onClose, setAllTransactionModal }) => {
  const { onOpen } = useDisclosure();
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

  const handleclose = () => {
    onClose();
    setAllTransactionModal(false);
  };

  const customScrollbar = css`
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }

    &::-webkit-scrollbar-track {
      background-color: white;
    }

    &::-webkit-scrollbar-thumb {
      background: #80808053;
      border-radius: 6px;
    }
  `;

  return (
    <>
      <div>
        <ModalOverlay />
        <ModalContent bg="white" height="800px" css={customScrollbar}>
          <ModalBody>
            <div className="all-transaction-heading">
              <p>Recent Transaction</p>
            </div>
            <Main TransactionData={yourTransaction} />
            <Button colorScheme="blue" mr={3} onClick={handleclose}>
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </div>
    </>
  );
};

export default AllTransaction;
