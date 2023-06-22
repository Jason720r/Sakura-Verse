import { useEffect, useState } from "react";
import { calculateTotalPrice } from "../orders/OrderPrice";






export const Home = () => {
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
        <h1>Sakura-Verse</h1>
        <header>Welcome to the Omni-Dimensional Japanese Super Duper Spider Delivery Service! 
          Due to staffing issues, we can only take one order at a time from each customer, apologies! </header>
        
        <div className="order-container" onClick={() => toggleOrder("all")}>
          <div className="order-header">
            <h3>Ongoing Order [expand/minimize] </h3>
            
          </div>
          {expandedOrders.includes("all") && (
            <div className="order-details">
              {orders.map((order) => {
                const item = items.find((item) => item.id === order.itemId) || {};
  
                return (
                  <div key={order.id}>
                    
                    <p> <strong>{item.name}</strong></p>
                    <p>Quantity: {order.quantity}</p>
                    <p>Note: {order.note}</p>
                    <p>${calculateTotalPrice([order], [item])}</p>
                  </div>
                );
              })}
              <p>Total Price: ${calculateTotalPrice(orders, items)}</p>
            </div>
          )}
        </div>
      </>
    );
  };
