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
        <header>Welcome to the Omni-Dimensional Japanese Super Duper Spider Delivery Service!</header>
        <article className="home">
            {
                
                orders.map(
                    (order) => {
                        const item = items.find((item) => item.id === order.itemId) || {}; // Set item as an empty object if it is not found
                        const isExpanded = expandedOrders.includes(order.id)
                        
                        return ( <section className="order" key={order.id}>
                            <div className="order-header" onClick={() => toggleOrder(order.id)}> 
                              <p>Order</p>
                           
            </div>
                    {isExpanded && (
                        <div className="order-details">
                              <p>Item: {item.name || ""}</p>
                             <p>Quantity: {order.quantity}</p>
                             <p> ${calculateTotalPrice([order], [item])}</p>
                        </div>
                    )}

                        </section>
                        );
                    }
                )
            
                   
            }
                    </article>
                    </>
            
                    
    );
    
    
}
