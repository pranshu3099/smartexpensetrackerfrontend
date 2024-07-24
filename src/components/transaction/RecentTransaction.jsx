import Main from "./Main";
const RecentTransaction = ({ yourTransaction }) => {
  const TransactionData = [];
  TransactionData.push(yourTransaction?.[0]);

  return (
    <>
      <Main TransactionData={TransactionData} />
    </>
  );
};

export default RecentTransaction;
