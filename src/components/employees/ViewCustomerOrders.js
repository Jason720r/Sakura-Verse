//In this module I will allow employees to view orders that customers have placed
//they should be able to confirm the orders,
import { useEffect, useState } from "react";
import { calculateTotalPrice } from "../orders/OrderPrice";






export const CustomerOrder = () => {
 const [orders, setOrders] = useState([])
 const [items, setItems] = useState([])
 const [expandedOrders, setExpandedOrders] = useState([])
 const itemURL = `http://localhost:8088/items`

 useEffect(
    () => {
        fetch(`http://localhost:8088/orders`)
        .then(response => response.json())
        .then((orderArray) => {
            setOrders(orderArray)
        })
    }, []
 )

 useEffect(() => {
    //Fetch item details for each order
    // const orderDetailsPromises = orders.map((order) => 
    fetch(`${itemURL}`)
    .then((response) => response.json())
    .then((itemArray) => {
        setItems(itemArray)
    }
    )
}, [])
const toggleOrder = (orderId) => {
    if (expandedOrders.includes(orderId)) {
        setExpandedOrders(expandedOrders.filter((id) => id !== orderId))
    } else {
        setExpandedOrders([...expandedOrders, orderId])
    }
}

  

  return (
    <>
    <h1>Customer Orders</h1>
    <header>Work faster spider!</header>
    
    <div className="order-container" onClick={() => toggleOrder("all")}>
      <div className="order-header">
        <h3>Order #1</h3>
      </div>
      {expandedOrders.includes("all") && (
        <div className="order-details">
          {orders.map((order) => {
            const item = items.find((item) => item.id === order.itemId) || {};

            return (
              <div key={order.id}>
                
                <p> {item.name}</p>
                <p>Quantity: {order.quantity}</p>
                <p>${calculateTotalPrice([order], [item])}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </>
);
};