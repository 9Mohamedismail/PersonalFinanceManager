import Transactions from "../components/TransactionsTable/Transactions";

function TransactionsPage() {
  return (
    <div className="py-10 px-4 lg:px-8">
      <Transactions grid={false} />
    </div>
  );
}

export default TransactionsPage;
