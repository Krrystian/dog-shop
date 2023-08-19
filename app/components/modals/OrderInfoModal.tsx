"use client";
import Modal from "./Modal";
import Heading from "../Heading";
import useOrderInfo from "@/app/hooks/useOrderInfo";
import { useRouter } from "next/navigation";

interface ItemProps {
  onClick: () => void;
  name: string;
  quantity: string;
  price: number;
}

const Item: React.FC<ItemProps> = ({ onClick, name, quantity, price }) => {
  return (
    <div className="border-black border grid grid-cols-3 cursor-default my-3">
      <p className=" col-span-3 flex justify-center text-xl">{name}</p>
      <p className="flex justify-center">Quantity: {quantity}</p>
      <p className="flex justify-center">Price: {price.toFixed(2)} $</p>
      <a
        className="flex justify-center text-cyan-900 cursor-pointer"
        onClick={onClick}
      >
        View product
      </a>
    </div>
  );
};

const OrderInfoModal = () => {
  const useOrder = useOrderInfo();
  const router = useRouter();
  const handleAction = () => {
    useOrder.onClose();
  };

  const handleViewProduct = (id: string) => {
    router.push(`/product/${id}`);
  };

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
      <>
        {useOrder.orderDetails.orderDetail &&
          useOrder.orderDetails.orderDetail?.map((product: any, index: any) => (
            <Item
              key={index}
              name={product.Product.name}
              price={product.transactionPrice}
              quantity={product.quantity}
              onClick={() => handleViewProduct(product.productId)}
            />
          ))}
      </>
      <p className="flex justify-center text-xl">
        Total: {useOrder.totalPrice} $
      </p>
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
