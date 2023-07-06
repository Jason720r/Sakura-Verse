import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateTotalPrice } from "./OrderPrice";

export const ItemsList = ({ searchTermState }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState([]);
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tempOrderItems, setTempOrderItems] = useState([]);
  const [order, setOrder] = useState({});
  const navigate = useNavigate();

  const localSpiderUser = localStorage.getItem("spider_user");
  const spiderUserObject = JSON.parse(localSpiderUser);

  useEffect(() => {
    const searchedItems = items.filter(item => {
      return item.name.toLowerCase().startsWith(searchTermState.toLowerCase());
    });
    setFiltered(searchedItems);
  }, [searchTermState]);

  useEffect(() => {
    fetch("http://localhost:8088/category")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8088/items")
      .then((response) => response.json())
      .then((ItemsArray) => {
        setItems(ItemsArray);
        setFiltered(ItemsArray);
      });
  }, []);

  const placeOrder = () => {
    let newOrder = null;
    if (selectedItem) {
      newOrder = {
        itemId: selectedItem.id,
        quantity: quantity,
        userId: spiderUserObject.id,
        note: order.note, // Use the note from the `order` state variable
        isCompleted: false,
      };
      setTempOrderItems((prevOrderItems) => [...prevOrderItems, newOrder]);
      setSelectedItem(null);
      setQuantity(1);
      setOrder({}); // Reset the `order` state to clear the note field
    }
  
    if (newOrder) {
      fetch(`http://localhost:8088/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      })
        .then((response) => response.json())
        .then((data) => {
          setSelectedItem(null);
          setQuantity(1);
          setCurrentOrder((prevOrder) => [...prevOrder, data]);
        })
        .catch((error) => {
          console.error("Error placing order:", error);
        });
    }
  };
  

  useEffect(() => {
    if (selectedCategoryId) {
      const filteredItems = items.filter((item) => item.categoryId === selectedCategoryId);
      setFiltered(filteredItems);
    } else {
      setFiltered(items);
    }
  }, [selectedCategoryId, items]);

  const confirmOrder = () => {
    setConfirmedOrders([]);
    setCurrentOrder([]);
    setTempOrderItems([]);
    navigate("/");
  };

  useEffect(() => {
    fetch(`http://localhost:8088/orders?userId=${spiderUserObject.id}`)
      .then((response) => response.json())
      .then((data) => {
        setConfirmedOrders(data);
      })
      .catch((error) => {
        console.log("Error retrieving confirmed orders:", error);
      });
  }, [spiderUserObject.id]);

  useEffect(() => {
    const totalPrice = calculateTotalPrice(tempOrderItems, items);
    setTotalPrice(totalPrice);
  }, [tempOrderItems, items]);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(confirmedOrders, items));
  }, [confirmedOrders, items]);

  return (
    <>
      <div className="row">
        <div className="col-md-9">
          <div className="category-buttons text-center">
            <button className="btn btn-dark-red" onClick={() => setSelectedCategoryId("")}>All items</button>
            {categories.map((category) => (
              <button className="btn btn-dark-red" key={category.id} onClick={() => setSelectedCategoryId(category.id)}>
                {category.type}
              </button>
            ))}
          </div>

          <div className="items text-center" style={{ marginTop: '2rem', border: '1px solid #c85959'  }}>
            {filteredItems.map((item) => (
              <div className="item" key={item.id}>
                <h4
                  onClick={() => {
                    setSelectedItem(item);
                    setPopupOpen(true);
                  }}
                  className="custom-text"
                >
                  {item.name}
                </h4>
                <p className="custom-smalltext "> <div className="white-text">{item.price}</div> </p>
                <p className="custom-smalltext">
                  Description: <div className="white-text">{item.description}</div>
                </p>
                {(isPopupOpen && selectedItem && selectedItem.id === item.id && selectedCategoryId === item.categoryId) && (
                  <>
                    <div className="popup">
                      <label className="custom-description" htmlFor={`quantity-${item.id}`}>Quantity:</label>
                      <input
                        type="number"
                        id={`quantity-${item.id}`}
                        min="1"
                        value={quantity}
                        onChange={(event) => setQuantity(parseInt(event.target.value))}
                      />
                      <label className="custom-description" htmlFor={`note-${item.id}`}>Note:</label>
                      <input
                        type="text"
                        id={`note-${item.id}`}
                        value={order.note}
                        onChange={(event) => setOrder((prevOrder) => ({ ...prevOrder, note: event.target.value }))}
                      />
                      <button className="btn btn-dark-red" onClick={placeOrder}>Add to Order</button>
                    </div>
                  </>
                )}
              </div>
            ))}
            
          </div>
        </div>

        <div className="col-md-3">
          <div className="current-order" style={{ marginTop: '4.5rem', padding: '1rem', border: '1px solid #c85959' }}>
          <h2 className="custom-text" style={{ position: 'absolute', top: '6.5rem', left: '67rem', background: '#8B0000', color: '#fff', padding: '0 0.5rem', margin: '0' }}>Current Order</h2>
            {tempOrderItems.length > 0 && (
              <>
                {tempOrderItems.map((orderItem, index) => {
                  const item = items.find((item) => item.id === orderItem.itemId);
                  const itemNote = orderItem.note || ""; // Get the note specific to the current orderItem
                  return (
                    <div key={index}>
                      <p className="custom-description2" style={{ fontSize: '0.7rem' }}> ( {orderItem.quantity} ) {item.name}</p>
                      <p className="custom-description" style={{ fontSize: '0.7rem' }}>${(item.price * orderItem.quantity).toFixed(2)}</p>
                      <p className="custom-description" style={{ fontSize: '0.7rem' }}>Note: {itemNote}</p>
                    </div>
                  );
                })}
                 <p className="custom-description2" style={{ marginTop: '2rem' }}><strong>Total Price: ${totalPrice}</strong></p>
                <button className="btn btn-dark-red" onClick={confirmOrder}>Confirm Order</button>
              </>
            )}
             <div className="bubble-text3">I recommend the "What's Up Danger Platter"</div>
            <div className="image-container2" style={{ display: 'flex', alignItems: 'center' }}>
      <img src="https://www.pngmart.com/files/12/Miles-Morales-Spider-Man-PNG-HD.png" alt="Miguel" 
      className="custom-image3"
      />
    </div>
          </div>
        </div>
      </div>
    </>
  );
};
    