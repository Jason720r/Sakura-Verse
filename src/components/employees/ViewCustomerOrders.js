import { useEffect, useState } from "react";
import { calculateTotalPrice } from "../orders/OrderPrice";

export const CustomerOrder = () => {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState([]);
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const itemURL = `http://localhost:8088/items`;

  const localSpiderUser = localStorage.getItem("spider_user");
  const spiderUserObject = JSON.parse(localSpiderUser);

  useEffect(() => {
    fetch(`http://localhost:8088/orders`)
      .then((response) => response.json())
      .then((orderArray) => {
        const ongoingOrders = orderArray.filter((order) => !order.isCompleted);
        const confirmedOrders = orderArray.filter((order) => order.isCompleted);
        setOrders(ongoingOrders);
        setConfirmedOrders(confirmedOrders);
      });
  }, []);

  useEffect(() => {
    fetch(`${itemURL}`)
      .then((response) => response.json())
      .then((itemArray) => {
        setItems(itemArray);
      });
  }, []);

  const toggleOrder = (orderId) => {
    if (expandedOrders.includes(orderId)) {
      setExpandedOrders(expandedOrders.filter((id) => id !== orderId));
    } else {
      setExpandedOrders([...expandedOrders, orderId]);
    }
  };

  const confirmAllOrders = () => {
    const updatedOrders = orders.map((order) => ({
      ...order,
      isCompleted: true,
    }));

    // Call the API to update orders
    Promise.all(
        updatedOrders.map((order) =>
          fetch(`http://localhost:8088/orders/${order.id}`, {
            method: "PUT", // or "PATCH" depending on your server's API
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
          })
        )
      )
      .then(() => {
        const newConfirmedOrders = [...confirmedOrders, ...orders];
        setConfirmedOrders(newConfirmedOrders);
        setOrders([]);
      })
      .catch((error) => {
        console.error("Error confirming orders:", error);
      });
  };

  return (
    <>
      <h1>Sakura-Verse Employee-Page</h1>
      <div>
        Are you happy working tirelessly every day, barely scraping by and wishing YOU could find your dream job? Well, this isn't it, you clown.
      </div>

      <div className="order-container" onClick={() => toggleOrder("all")}>
  <div className="order-header">
    <h3>Ongoing Customer Orders [expand/minimize]</h3>
  </div>
  {expandedOrders.includes("all") && (
    <div className="order-details">
      {orders.map((order) => {
        const item = items.find((item) => item.id === order.itemId) || {};

        return (
          <div key={order.id}>
            <p><strong>{item.name}</strong></p>
            <p>Quantity: {order.quantity}</p>
            <p>${calculateTotalPrice([order], [item])}</p>
          </div>
        );
      })}
      <p>Total Price: ${calculateTotalPrice(orders, items)}</p>
    </div>
  )}
</div>

<button onClick={confirmAllOrders}>Confirm All Orders</button>

<div className="confirmed-orders-container">
  <h3>Confirmed Orders</h3>
  {confirmedOrders.map((order) => {
    const item = items.find((item) => item.id === order.itemId) || {};

    return (
      <div key={order.id}>
        <p><strong>{item.name}</strong></p>
        <p>Quantity: {order.quantity}</p>
        <p>${calculateTotalPrice([order], [item])}</p>
      </div>
    );
  })}
</div>
    </>
  );
};







