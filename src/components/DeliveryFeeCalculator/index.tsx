import React, { useState, ChangeEvent } from "react";

import { format } from "date-fns";
import Input from "../inputFiled";

const DeliveryFeeCalculator: React.FC = () => {
  const [formState, setFormState] = useState({
    cartValue: 0,
    deliveryDistance: 0,
    numItems: 0,
    orderTime: new Date(),
  });

  const [showResult, setShowResult] = React.useState<boolean>(false);
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleOrderTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, orderTime: new Date(e.target.value) }));
  };

  const calculateDeliveryFee = () => {
    console.log(
      "formState",
      formState.cartValue,
      formState.deliveryDistance,
      formState.numItems,
      formState.orderTime
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    calculateDeliveryFee();
  };
  return (
    <div className={"flex flex-col gap-3"}>
      <div
        className={`${
          showResult ? "bg-sky-400 text-white" : "bg-white"
        } drop-shadow-2xl p-[24px] rounded-[12px] inline-block  min-w-[400px]`}
      >
        <h1 className={"font-semibold text-lg mb-3 mx-auto text-center"}>
          Delivery Fee Calculator
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <Input
            id={"cartValue"}
            dataTestId="cartValue"
            name={"cartValue"}
            step={"0.01"}
            type={"number"}
            label={"Cart Value"}
            htmlFor={"cartValue"}
            supportingText={"€"}
            value={formState.cartValue.toString()}
            min={"0"}
            max={"100000"}
            onChange={handleInputChange}
          />
          <Input
            id={"deliveryDistance"}
            dataTestId={"deliveryDistance"}
            name={"deliveryDistance"}
            supportingText={"m"}
            step={"1"}
            type={"number"}
            min={"0"}
            max={"50000"}
            label={"Delivery Distance"}
            htmlFor={"deliveryDistance"}
            value={formState.deliveryDistance.toString()}
            onChange={handleInputChange}
          />
          <Input
            id={"amountOfItems"}
            dataTestId={"numItems"}
            name={"amountOfItems"}
            step={"1"}
            min={"0"}
            max={"1000"}
            type={"number"}
            label={"Amount of Items"}
            htmlFor={"amountOfItems"}
            value={formState.numItems.toString()}
            onChange={handleInputChange}
          />
          <Input
            id={"orderTime"}
            dataTestId={"orderTime"}
            name={"orderTime"}
            step={"60"}
            type={"datetime-local"}
            value={format(formState.orderTime, "yyyy-MM-dd'T'HH:mm")}
            label={"Time"}
            htmlFor={"dateTime"}
            onChange={handleOrderTimeChange}
          />
          <input
            type="submit"
            value="Calculate delivery fee"
            className={
              "disabled:bg-gray-300 disabled:cursor-not-allowed" +
              " " +
              "font-bold mt-4 bg-sky-400 text-white rounded-md px-4 py-2 border-none" +
              " " +
              "enabled:hover:bg-sky-300"
            }
          />
        </form>
      </div>
    </div>
  );
};

export default DeliveryFeeCalculator;