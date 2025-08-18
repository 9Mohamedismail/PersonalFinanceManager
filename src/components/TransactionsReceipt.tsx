import Barcode from "react-barcode";

function TransactionsReceipt() {
  return (
    <div className="border w-1/2 font-receipt ">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-wide mt-2">
          Receipt
        </h1>
        <h1 className="text-lg text-gray-900"> Berqhotel Grosse Scheidegg</h1>
        <h1 className="text-lg text-gray-900">
          3818 Grindeiwald Fanile R. Mullier
        </h1>
      </div>

      <div className="flex justify-between p-4 text-base text-gray-900">
        <div className="text-start">
          <h1> Receipt Number 4572</h1>
          <h1>Alan</h1>
        </div>
        <div className="text-end">
          <h1>08/18/2025</h1>
          <h1> Pending</h1>
        </div>
      </div>

      <div className="flex justify-between p-4 mx-2 text-lg text-gray-900">
        <h1>2x Latte Macchiato</h1>
        <h1>Total:</h1>
        <h1>$400</h1>
      </div>

      <div className="flex flex-col p-4 text-lg text-gray-900">
        <div className="flex flex-row gap-4">
          <h1>Account:</h1>
          <h1>Account name</h1>
        </div>

        <div className="flex flex-row gap-4">
          <h1>Transaction Type:</h1>
          <h1>Type</h1>
        </div>
      </div>

      <div className="flex justify-center text-lg text-gray-900">
        <h1>Amazon Prime Monthly</h1>
      </div>
      <div className="flex">
        <Barcode value="http://localhost:5173/" displayValue={false} />
      </div>
    </div>
  );
}

export default TransactionsReceipt;
