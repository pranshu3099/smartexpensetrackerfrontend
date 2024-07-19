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
import { useReducer, useState } from "react";
import { getCategory } from "../../utils/utils";
import { authmethod, userData, bearer } from "../../utils/utils";
import { css } from "@emotion/react";
const react_api_url = import.meta.env.VITE_REACT_APP_API_URL;
import axios from "axios";
const Transaction = ({ isOpen, onClose, onOpen, setOpenModal }) => {
  const closeModal = () => {
    setOpenModal(false);
  };

  const TransactionReducer = (state, action) => {
    switch (action?.type) {
      case "amount":
        return { ...state, amount: action.amount };
      case "category":
        return { ...state, category: action.category };
      case "payment":
        return { ...state, payment_mode: action.payment_mode };
      case "message":
        return { ...state, your_message: action.your_message };
    }
  };

  function checkRequiredFields(info) {
    const res = {};
    Object.keys(info).forEach((key) => {
      if (info[key] === "") {
        res[key] = true;
      }
    });
    if (Object.keys(res).length) {
      setRequireFields(res);
      return false;
    } else {
      setRequireFields({});
      return true;
    }
  }

  const fetchData = (info) => {
    try {
      axios
        .post(`${react_api_url}/v1/user/addexpensedata`, info)
        .then((response) => {
          if (response.status === 200) {
            console.log(response?.data);
            // setAuth(true);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    const info = {
      amount: state.amount,
      category: state.category,
      payment_mode: state.payment_mode,
      message: state.your_message,
    };
    if (checkRequiredFields(info)) {
      const payment_mode = state?.payment_mode === "1" ? "Online" : "Cash";
      const data = {
        ...info,
        payment_mode: payment_mode,
        email: userData?.email,
        user_id: userData?.id,
      };

      fetchData(data);
      setOpenModal(false);
    }
  };

  const [state, dispatch] = useReducer(TransactionReducer, {
    amount: "",
    category: "",
    payment_mode: "",
    your_message: "",
  });

  const [requiredFields, setRequireFields] = useState({});
  const [lastTag, setLastTag] = useState("");
  const customScrollbar = css`
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }

    &::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0.912);
    }

    &::-webkit-scrollbar-thumb {
      background: #80808053;
      border-radius: 6px;
    }
  `;

  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent
          bg="rgba(0, 0, 0, 0.912)"
          height="800px"
          className="transaction-modal-container"
          css={customScrollbar}
        >
          <ModalBody>
            <div className="transaction-main-container">
              <h1 className="heading-container">Add Transaction</h1>
              <Input
                type="number"
                value={state?.amount}
                placeholder="Amount"
                style={{ color: "white" }}
                onChange={(e) => {
                  dispatch({
                    ...state,
                    amount: e.target.value,
                    type: "amount",
                  });
                }}
              ></Input>
              <div className="login-error-container">
                {requiredFields.amount && (
                  <p style={{ color: "red" }}> Amount field is required</p>
                )}
              </div>
              <div className="category-container">
                <p className="category-heading">Category</p>
                <div
                  className="category-icon-container"
                  onClick={(e) => {
                    const category = getCategory(e.target, lastTag, setLastTag);
                    dispatch({
                      ...state,
                      category,
                      type: "category",
                    });
                  }}
                >
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
              <div className="login-error-container">
                {requiredFields.category && (
                  <p style={{ color: "red" }}> Category field is required</p>
                )}
              </div>
              <div className="payment-method-container">
                <p>Payment Method</p>
                <RadioGroup>
                  <Stack
                    direction="row"
                    onChange={(e) => {
                      dispatch({
                        ...state,
                        payment_mode: e.target.value,
                        type: "payment",
                      });
                    }}
                  >
                    <Radio value="1">Online</Radio>
                    <Radio value="2">Cash</Radio>
                  </Stack>
                </RadioGroup>
              </div>
              <div className="login-error-container">
                {requiredFields.payment_mode && (
                  <p style={{ color: "red" }}> Payment field is required</p>
                )}
              </div>
              <div className="message-container">
                <p>Your short message</p>
                <Textarea
                  placeholder="your message"
                  size="sm"
                  value={state.your_message}
                  onChange={(e) => {
                    dispatch({
                      ...state,
                      your_message: e.target.value,
                      type: "message",
                    });
                  }}
                />
              </div>
              <div className="login-error-container">
                {requiredFields.message && (
                  <p style={{ color: "red" }}> message field is required</p>
                )}
              </div>
            </div>
            <div style={{ marginTop: "16px" }}>
              <Button colorScheme="blue" mr={3} onClick={closeModal}>
                Close
              </Button>
              <Button
                variant="ghost"
                backgroundColor={"white"}
                onClick={handleSubmit}
              >
                Add
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Transaction;
