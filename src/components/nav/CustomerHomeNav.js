import { useEffect, useState } from "react";
import { calculateTotalPrice } from "../orders/OrderPrice";


export const Home = () => {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [activeSection, setActiveSection] = useState('ongoing');
  const [currentOrders, setCurrentOrders] = useState([]);

  const itemURL = `http://localhost:8088/items`;

  // const handleSectionClick = (section) => {
  //   setActiveSection(section);
  // };

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

  const toggleOrder = async (orderId) => {
    if (expandedOrders.includes(orderId)) {
      setExpandedOrders(expandedOrders.filter((id) => id !== orderId));
    } else {
      const order = orders.find((order) => order.id === orderId);
      if (order) {
        const item = await fetch(`${itemURL}/${order.itemId}`).then((response) => response.json());
        order.item = item;
      }
      setExpandedOrders([...expandedOrders, orderId]);
      setActiveSection('ongoing'); // Set the active section to 'ongoing'
    }
  };
  useEffect(() => {
    const ongoingOrders = orders.filter((order) => !order.isCompleted);
    setCurrentOrders(ongoingOrders);
  }, [orders]);
  

  const handleCompletedOrdersClick = () => {
    toggleOrder("completed");
    setActiveSection('completed');
  };

 

  return (
    <>
    <p>
      <h1 id="sakura-verse-heading" >Sakura-Verse</h1>
      </p>
      <div className="bubble-text">You have to try "A Really Good Soup"...</div>
      <div className="image-container image-container1" >
      <img src="https://clipart.info/images/ccovers/1559828309spiderman-marvel-comics-png-18.png" alt="OG" 
      className="custom-image2"
      />
    </div>
    <div className="bubble-text2">Don't listen to him, "A Really Good Soup" is a scam...</div>
    <div className="image-container2" style={{ display: 'flex', alignItems: 'center' }}>
      <img src="https://clipart-library.com/data_images/162049.gif" alt="Miguel" 
      className="custom-image"
      />
    </div>

    <div className="orders-container image-container2">
      <div className="order-section">
      <div className={`order-box ${activeSection === 'ongoing' ? 'active' : ''}`}>
        <button
          className="btn order-button navbar__link" style={{ background: 'transparent', color: '#fff', border: 'none' }} onClick={() => toggleOrder('ongoing')} >
         Ongoing Orders
        </button>
        {expandedOrders.includes('ongoing') && (
          <div className="ongoing-orders-details" style={{ marginTop: '2rem', backgroundColor: 'black', padding: '10px' }}>
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => {
                const item = items.find((item) => item.id === order.itemId) || {};

                return (
                  <div className="order-item"  key={order.id}>
                    <p className="custom-description2" style={{ marginTop: '2rem' }}>
                      <strong>{item.name}</strong>
                    </p>
                    <p className="custom-description">Quantity: {order.quantity}</p>
                    <p className="custom-description">Note: {order.note}</p>
                    <p className="white-text">${calculateTotalPrice([order], [item])}</p>
                  </div>
                  
                  
                );
              })
            ) : (
              <p className="custom-description">No ongoing orders to display.</p>
            )}
            <p className="custom-description2">
              <strong className="text-center">
                Total Price: ${calculateTotalPrice(currentOrders, items)}
              </strong>
            </p>
           </div>
          
        )}
      </div>
      </div>
      

      <div className="order-section">
      <div className={`order-box ${activeSection === 'completed' ? 'active' : ''}`}>
        <button
          className="btn order-button navbar__link" style={{ background: 'transparent', color: '#fff', border: 'none' }} onClick={() => handleCompletedOrdersClick('completed')}
        >
          Completed Orders
        </button>
        {expandedOrders.includes('completed') && (
          <div className="ongoing-orders-details" style={{ marginTop: '2rem', backgroundColor: 'black', padding: '10px' }}>
            {completedOrders.length > 0 ? (
              completedOrders.map((order) => {
                const item = items.find((item) => item.id === order.itemId) || {};

                return (
                  <div className="order-item" key={order.id}>
                    <p className="custom-description2" style={{ marginTop: '2rem' }}>
                      <strong>{item.name}</strong>
                    </p>
                    <p className="custom-description">Quantity: {order.quantity}</p>
                    <p className="custom-description">Note: {order.note}</p>
                    <p className="custom-description">${calculateTotalPrice([order], [item])}</p>
                  </div>
                );
              })
            ) : (
              <p className="custom-description">No completed orders to display.</p>
            )}
              <p className="custom-description2">
              <strong className="text-center">
                Total Price: ${calculateTotalPrice(completedOrders, items)}
              </strong>
            </p>
          </div>
        )}
        </div>
      </div>
    </div>
  </>
);
            }