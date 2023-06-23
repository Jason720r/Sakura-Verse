import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateTotalPrice } from "./OrderPrice";

//This declares a functional component named ItemsList which accepts searchTermState as a prop.
export const ItemsList = ({ searchTermState }) => {
    //These lines declare multiple state variables using the useState hook. 
    //Each variable is paired with a setter function that allows updating the state.
  const [items, setItems] = useState([]);
  const [filteredItems, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState([])
  const [confirmedOrders, setConfirmedOrders] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [tempOrderItems, setTempOrderItems] = useState([])
  const [order, setOrder] = useState({})


  //These lines retrieve the spider_user item from the browser's local storage and parse it as a JSON object. 
  //The user object is stored in spiderUserObject
  const localSpiderUser = localStorage.getItem("spider_user");
  const spiderUserObject = JSON.parse(localSpiderUser);

  //This useEffect hook is responsible for filtering the items array based on 
  //the searchTermState. It runs whenever searchTermState changes and updates the filteredItems state accordingly.
  useEffect(
    () => {
       const searchedItems = items.filter(item => {
        return item.name.toLowerCase().startsWith(searchTermState.toLowerCase())
       })
       setFiltered(searchedItems)
    },
    [ searchTermState ]
  )
//This useEffect hook fetches the categories from the server and sets the categories state with the retrieved data.
// It runs only once when the component mounts
  useEffect(() => {
    fetch("http://localhost:8088/category")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);


  //This useEffect hook fetches the items from the server and sets both the items and filteredItems states with the retrieved data. 
  //It also runs only once when the component mounts
  useEffect(() => {
    fetch("http://localhost:8088/items")
      .then((response) => response.json())
      .then((ItemsArray) => {
        setItems(ItemsArray);
        setFiltered(ItemsArray);
      }); 
  }, []);


  // creates an order object based on the selected item, quantity, and user ID. It sends a POST request to the server with the order details. 
  //Upon successful response, 
  //it logs the order data, resets the selected item and quantity, and adds the order to the current order state
  const placeOrder = () => {
    //create the order object
     let order = null;
    if(selectedItem) {
    order = {
      itemId: selectedItem.id,
      quantity: quantity,
      userId: spiderUserObject.id,
      note: "",
      isCompleted: false
      //add isCompleted property for confirmed orders
    };
    setTempOrderItems((prevOrderItems) => [...prevOrderItems, order]);
    setSelectedItem(null);
    setQuantity(1)
    
   
    };

    //send the order to the server
    if (order) {
    fetch(`http://localhost:8088/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        //order successfully placed, perform any necessary actions
        console.log("Added to Order", data);
        //reset the selected item and quantity
        setSelectedItem(null);
        setQuantity(1);
        //add the selected item to the current order
        setCurrentOrder((prevOrder) => [...prevOrder, data])
      })
      .catch((error) => {
        //error occurred while placing the order
        console.error("Error placing order:", error);
      });
    }
  
    };


  //This useEffect hook is responsible for filtering the items based on the selected category. It updates the filteredItems state based on the selected category ID. 
  //It runs whenever selectedCategoryId or items change.
  useEffect(() => {
    if (selectedCategoryId) {
      const filteredItems = items.filter((item) => item.categoryId === selectedCategoryId);
      setFiltered(filteredItems);
    } else {
      setFiltered(items);
    }
  }, [selectedCategoryId, items]);


    



//This defines the confirmOrder function that adds the currentOrder to the confirmedOrders state, clears the currentOrder, and calculates the total price using the calculateTotalPrice function. 
//It updates the totalPrice state with the calculated value.
const confirmOrder = () => {
    
    setConfirmedOrders(() => [])
    setCurrentOrder([])
    setTempOrderItems([]);
  }


  //This useEffect hook fetches the confirmed orders for the current user from the server. It sets the confirmedOrders state with the retrieved data. 
  //It runs whenever spiderUserObject.id changes.
useEffect(() => {
    //Retrieve the user's confirmed orders from the server
    fetch(`http://localhost:8088/orders?userId=${spiderUserObject.id}`)
    .then((response) => response.json())
    .then((data) => {
        //Set the retrieved confirmed orders to the state
        setConfirmedOrders(data);
    })
    .catch((error) => {
        console.log("Error retrieving confirmed orders:", error);
    })
}, [spiderUserObject.id])


useEffect(() => {
    const totalPrice = calculateTotalPrice(tempOrderItems, items);
    setTotalPrice(totalPrice)
}, [tempOrderItems, items])


//This useEffect hook updates the totalPrice state by calling the calculateTotalPrice function 
//whenever either confirmedOrders or items change
  useEffect(() => { setTotalPrice(calculateTotalPrice(confirmedOrders, items));},
[confirmedOrders, items]);

  return (
    <>
      <div className="category-buttons">
        <button onClick={() => setSelectedCategoryId("")}> All items</button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategoryId(category.id)}
          >
            {category.type}
          </button>
        ))}
      </div>

      <div className="items">
        {filteredItems.map((item) => (
          <div className="item" key={item.id}>
            <h4 onClick={() => { setSelectedItem(item); setPopupOpen(true); }}>
              {item.name}
            </h4>
            <p>Price: {item.price}</p>
            {(isPopupOpen && selectedItem && selectedItem.id === item.id && selectedCategoryId === item.categoryId) && (
              <><div className="popup">
                        <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                        <input
                            type="number"
                            id={`quantity-${item.id}`}
                            min="1"
                            value={quantity}
                            onChange={(event) => setQuantity(parseInt(event.target.value))} />
                            <label htmlFor={`note-${item.id}`}>Note:</label>
                            <input 
                            type="text"
                            id={`note-${item.id}`}
                            value={order.note}
                            onChange={(event) => setOrder((prevOrder) => ({ ...prevOrder, note: event.target.value}))} //Update the note property in the order state
                            />
                        <button onClick={placeOrder}>Add to Order</button>
                    </div><div className="current-order">
                            <h2>Current Order:</h2>
                            {tempOrderItems.length > 0 && (
                                <>
                            {tempOrderItems.map((orderItem, index) => {
                                const item =items.find((item) => item.id === orderItem.itemId)
              
                                return (
                                <div key={index}>
                                    <p>Item: {item.name}</p>
                                    <p>Quantity: {orderItem.quantity}</p>
                                    <p>${item.price * orderItem.quantity.toFixed(2)}</p>
                                    <p>Note: {order.note}</p>
                                   
                                </div>
                                )
                                
                            })}
                            </>
                            )}
                            {confirmedOrders.map((orderItem, index) => {
  const item = items.find((item) => item.id === orderItem.itemId);
  const totalPrice = (item.price * orderItem.quantity).toFixed(2);
  return (
    <div key={orderItem.id}>
      <p>Item: {item.name}</p>
      <p>Quantity: {orderItem.quantity}</p> 
      <p> ${totalPrice}</p>
      <p>Note: {order.note}</p>
      {/* <button onClick={() => deleteItem(index)}>Remove</button> */}
    </div>
  );
})}
                        </div></>
            
            )}
          </div>
        ))}
        <p><strong>Total Price: ${totalPrice}</strong></p> {/* Display the total price */}
      <button onClick={confirmOrder}>Confirm Order</button>
      </div>
    </>
  );
};
    