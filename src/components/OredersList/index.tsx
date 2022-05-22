import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import OrderCard, { Order } from "../OrderCard";

const OrdersListBox = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
};

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5555/orders");
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  if (loading) {
    return <h4>Loading...</h4>;
  }

  return (
    <Box sx={OrdersListBox}>
      {orders.map((order: Order, index) => {
        return <OrderCard key={index} order={order} />;
      })}
    </Box>
  );
};

export default OrdersList;
