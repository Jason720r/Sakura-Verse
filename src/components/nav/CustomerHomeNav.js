import { useEffect, useState } from "react";
import { calculateTotalPrice } from "../orders/OrderPrice";

export const Home = () => {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const itemURL = `http://localhost:8088/items`;

  useEffect(() => {
    fetch(`http://localhost:8088/orders`)
      .then((response) => response.json())
      .then((orderArray) => {
        setOrders(orderArray);
      });
  }, []);

  useEffect(() => {
    fetch(`${itemURL}`)
      .then((response) => response.json())
      .then((itemArray) => {
        setItems(itemArray);
      });
  }, []);

  useEffect(() => {
    const completedOrders = orders.filter((order) => order.isCompleted);
    setCompletedOrders(completedOrders);
  }, [orders]);

  const toggleOrder = (orderId) => {
    if (expandedOrders.includes(orderId)) {
      setExpandedOrders(expandedOrders.filter((id) => id !== orderId));
    } else {
      setExpandedOrders([...expandedOrders, orderId]);
    }
  };

  const handleCompletedOrdersClick = () => {
    toggleOrder("completed");
  };

  const currentOrders = orders.filter((order) => !order.isCompleted);

  return (
    <>
      <h1>Sakura-Verse</h1>
      <header>
        Welcome to the Omni-Dimensional Japanese Super Duper Spider Delivery
        Service! Due to staffing issues, we can only take one order at a time
        from each customer, apologies!
      </header>
  
      <div className="order-container">
        <div className="order-header">
          <button onClick={() => toggleOrder("all")}>
            Ongoing Order [expand/minimize]
          </button>
        </div>
  
        {expandedOrders.includes("all") && (
          <div className="order-details">
            {currentOrders.map((order) => {
              const item =
                items.find((item) => item.id === order.itemId) || {};
  
              return (
                <div key={order.id}>
                  <p>
                    <strong>{item.name}</strong>
                  </p>
                  <p>Quantity: {order.quantity}</p>
                  <p>Note: {order.note}</p>
                  <p>${calculateTotalPrice([order], [item])}</p>
                </div>
              );
            })}
            <p>
              <strong>
                Total Price: ${calculateTotalPrice(currentOrders, items)}
              </strong>
            </p>
          </div>
        )}
      </div>
  
      <div className="completed-orders-container">
        <button onClick={handleCompletedOrdersClick}>
          Completed Orders [expand/minimize]
        </button>
        {expandedOrders.includes("completed") && (
          <div className="completed-orders-details">
            {completedOrders.length > 0 ? (
              completedOrders.map((order) => {
                const item =
                  items.find((item) => item.id === order.itemId) || {};
  
                return (
                  <div key={order.id}>
                    <p>
                      <strong>{item.name}</strong>
                    </p>
                    <p>Quantity: {order.quantity}</p>
                    <p>Note: {order.note}</p>
                    <p>${calculateTotalPrice([order], [item])}</p>
                  </div>
                );
              })
            ) : (
              <p>No completed orders to display.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
            }