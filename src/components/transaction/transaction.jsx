import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import "./transaction.css";
import investment from "../../icons/investment-invest-svgrepo-com.svg";
import taxes from "../../icons/taxes-bill-svgrepo-com.svg";
import rent from "../../icons/rent-camping-svgrepo-com.svg";
import gifts from "../../icons/gifts-svgrepo-com.svg";
import education from "../../icons/education-laboratory-school-svgrepo-com.svg";
import medical from "../../icons/medical-kit-svgrepo-com.svg";
import travel from "../../icons/travel-svgrepo-com.svg";
import shopping from "../../icons/shopping-bag-svgrepo-com.svg";
import entertainment from "../../icons/entertainment-svgrepo-com.svg";
import foodanddining from "../../icons/food-and-drink-svgrepo-com.svg";
import { Radio, RadioGroup } from "@chakra-ui/react";

const Transaction = ({ isOpen, onClose, onOpen, setOpenModal }) => {
  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent bg="rgba(0, 0, 0, 0.912)" height="100vh">
          <ModalBody>
            <div className="transaction-main-container">
              <h1 className="heading-container">Add Transaction</h1>
              <Input
                type="number"
                placeholder="Amount"
                style={{ color: "white" }}
              ></Input>
              <div className="category-container">
                <p className="category-heading">Category</p>
                <div className="category-icon-container">
                  <div className="category-icon-sub-container">
                    <img src={investment} alt="" />
                    <p>Investment</p>
                  </div>
                  <div className="category-icon-sub-container">
                    <img src={taxes} alt="" />
                    <p>Taxes</p>
                  </div>
                  <div className="category-icon-sub-container">
                    <img src={rent} alt="" />
                    <p>Rent</p>
                  </div>
                  <div className="category-icon-sub-container">
                    <img src={gifts} alt="" />
                    <p>Gifts</p>
                  </div>{" "}
                  <div className="category-icon-sub-container">
                    <img src={education} alt="" />
                    <p>Eduction</p>
                  </div>{" "}
                  <div className="category-icon-sub-container">
                    <img src={medical} alt="" />
                    <p>Medical</p>
                  </div>{" "}
                  <div className="category-icon-sub-container">
                    <img src={travel} alt="" />
                    <p>Travelling</p>
                  </div>{" "}
                  <div className="category-icon-sub-container">
                    <img src={entertainment} alt="" />
                    <p>Entertainment</p>
                  </div>{" "}
                  <div className="category-icon-sub-container">
                    <img src={shopping} alt="" />
                    <p>shopping</p>
                  </div>
                  <div className="category-icon-sub-container">
                    <img src={foodanddining} alt="" />
                    <p>FoodandDining</p>
                  </div>
                </div>
              </div>
              <div className="payment-method-container">
                <p>Payment Method</p>
                <RadioGroup>
                  <Stack direction="row">
                    <Radio value="1">Online</Radio>
                    <Radio value="2">Cash</Radio>
                  </Stack>
                </RadioGroup>
              </div>
              <div className="message-container">
                <p>Your short message</p>
                <Textarea placeholder="your message" size="sm" />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Close
            </Button>
            <Button variant="ghost" backgroundColor={"white"}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Transaction;
