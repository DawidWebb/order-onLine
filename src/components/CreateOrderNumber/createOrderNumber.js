// import { useContext } from "react";
// import { StoreContext } from "../../Store/StoreProvider";
import request from "../../helpers/request";

const CreateOrderNumber = ({ currentOrderNumber, setNewOdredNumber }) => {
  //   const { currentOrderNumber, setNewOdredNumber } = useContext(StoreContext);

  const putNewOrderNumber = async (number) => {
    const objectNumber = {
      orderNo: number,
      id: currentOrderNumber._id,
    };

    const { data, status } = await request.put("/ordernumber", objectNumber);
    if (status === 202) {
      setNewOdredNumber(number);
    } else {
      console.log(status, data.messages);
    }
  };

  const orderNumber = () => {
    const number = currentOrderNumber.orderNo + 1;
    putNewOrderNumber(number);

    const months = [
      "styczeń",
      "luty",
      "marzec",
      "kwiecień",
      "maj",
      "czerwiec",
      "lipiec",
      "sierpień",
      "wrzeseiń",
      "paźdzeirnik",
      "listopad",
      "grudzeiń",
    ];
    let date = new Date();
    const year = date.getFullYear();
    const monthNo = date.getMonth();
    const month = months[monthNo];
    const orderNumber = `${number}/${month}/${year}`;
    return orderNumber;
  };
  return orderNumber();
};
export default CreateOrderNumber;
