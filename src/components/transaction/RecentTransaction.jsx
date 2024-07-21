import { Button } from "@chakra-ui/react";
import { imageData } from "../../carouseldata/data";
const RecentTransaction = ({ yourTransaction }) => {
  const TransactionData = [];
  TransactionData.push(yourTransaction?.[0]);
  const getDate = (date) => {
    const dateTimeString = date;
    const new_date = new Date(dateTimeString);

    const day = new_date.getUTCDate();
    const month = new_date.toLocaleString("en-US", { month: "long" });
    const year = new_date.getUTCFullYear().toString().slice(-2);

    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  };

  const getImage = (category) => {
    const filteredImageData = imageData.filter((data) => {
      return data?.category === category;
    });
    return filteredImageData[0]?.src;
  };

  return (
    <>
      <div className="recent-transaction-container">
        <p>Recent Transaction</p>
        <Button style={{ backgroundColor: "black", color: "white" }}>
          See All
        </Button>
        <div className="recent-transaction-sub-container">
          {TransactionData.map((data, index) => {
            return (
              <div
                key={data?._id || index}
                className="transaction-data-container"
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RecentTransaction;
