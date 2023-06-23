import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const ItemForm = () => {
   const navigate = useNavigate()
   
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
   const [item, update] = useState({
        name: "",
        price: 0,
        categoryId: ""
        
   })
   const[categories, setCategories] = useState([]);

   useEffect(() => {
    fetch("http://localhost:8088/category")
    .then(response => response.json())
    .then(data => setCategories(data));
   },
   []);

  

   const handleSaveButtonClick = (event) => {
    event.preventDefault()
   
    const categoryIdInt = parseInt(item.categoryId, 10);

   // TODO: Create the object to be saved to the API
   const ticketToSendToAPI = {
        name: item.name,
        price: item.price,
        categoryId: categoryIdInt || null

   }
    // TODO: Perform the fetch() to POST the object to the API

   return fetch(`http://localhost:8088/items`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(ticketToSendToAPI)
   })
   .then(response => response.json())
   .then(() => {
    navigate("/itemDelete")
   })


   }

return (

    <form className="foodForm">
        <h2 className="foodForm__title">New Item</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                required autoFocus
                type="text"
                className="form-control"
                value={item.name}
                onChange={
                    (evt) => {
                        const copy = {...item}
                        copy.name =evt.target.value
                        update(copy)

                    }
                } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input type="number"
                className="form-control"
                value={item.price}
                onChange={
                    (evt) => {
                        const copy = {...item}
                        copy.price = parseFloat(evt.target.value)
                        update(copy)
                    }
                } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                className="form-control"
                value={item.categoryId}
                onChange={
                    (evt) => {
                        const copy = {...item}
                        copy.categoryId = parseFloat(evt.target.value, 10)
                        update(copy)
                    }
                } >
                <option value="">Select a category</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.type}
                    </option>
                ))}
                </select>
            </div>
        </fieldset>
        <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Item
            </button>
    </form>
)
}