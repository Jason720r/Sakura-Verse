import React, { useEffect, useState } from "react";

export const ItemDelete = () => {
    const [items, setItems] = useState([]);


    const localSpiderUser = localStorage.getItem("spider_user");
    const spiderUserObject = JSON.parse(localSpiderUser);

   

    useEffect(() => {

        //Fetch the items from the server/database
        fetch(`http://localhost:8088/items`)
        .then((response) => response.json())
        .then((itemsData) => {
            setItems(itemsData)
        })
        .catch((error) => {
            console.error("Error retrieving items:", error)
        })
    }, []);

    const deleteItem = (itemId) => {
        //Send DELETE request to the server to delete the item
        fetch(`http://localhost:8088/items/${itemId}`, {
            method: "DELETE",
        })
        .then((response) => response.json())
        .then(() => {
            //Remove the deleted item from local state
            setItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
            console.log("Item deleted successfully")
        })
        .catch((error) => {
            console.error("Error deleting item:", error)
        })
    }
    return (


        <div>
          <h2 className="custom-description2">Item Editing</h2>
          <table>
            <thead>
              <tr>
                <th className="custom-description">ID</th>
                <th className="custom-description">Name</th>
                <th className="custom-description">Price</th>
                <th className="custom-description">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="white-text">{item.id}</td>
                  <td className="white-text">{item.name}</td>
                  <td className="white-text">{item.price}</td>
                  <td>
                    <button className="btn btn-dark-red"onClick={() => deleteItem(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
