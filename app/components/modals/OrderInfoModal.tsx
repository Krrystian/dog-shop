"use client";
import Modal from "./Modal";
import Heading from "../Heading";
import useOrderInfo from "@/app/hooks/useOrderInfo";
import { useEffect } from "react";

const OrderInfoModal = () => {
  const useOrder = useOrderInfo();

  const handleAction = () => {
    useOrder.onClose();
  };

  useEffect(() => {
    console.log(useOrder.orderDetails);
  });

  const body = (
    <div className="flex flex-col gap-4">
      <Heading
        center
        title="Your order information"
        subtitle={useOrder.orderDetails.id}
      />
      <table>
        <tbody>
          <tr className=" border-2">
            <th>Name </th>
            <th>{useOrder.orderDetails.User?.name}</th>
          </tr>
          <tr className=" border-2">
            <th>Email </th>
            <th>{useOrder.orderDetails.User?.email}</th>
          </tr>
          <tr className=" border-2">
            <th>Country </th>
            <th>{useOrder.orderDetails.deliveryPlace?.country}</th>
          </tr>
          <tr className=" border-2">
            <th>Town </th>
            <th>{useOrder.orderDetails.deliveryPlace?.city}</th>
          </tr>
          <tr className=" border-2">
            <th>Street </th>
            <th>{useOrder.orderDetails.deliveryPlace?.street}</th>
          </tr>
          <tr className=" border-2">
            <th>House number </th>
            <th>{useOrder.orderDetails.deliveryPlace?.houseNumber}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <Modal
      title="Order detail"
      actionLabel="Back"
      onSubmit={handleAction}
      disabled={false}
      isOpen={useOrder.isOpen}
      onClose={handleAction}
      body={body}
    />
  );
};

export default OrderInfoModal;
