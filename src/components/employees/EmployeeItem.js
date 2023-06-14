import { useEffect, useState } from "react"


export const ItemForm = () => {
    const [feedback, setFeedback] = useState("")
   
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
   const [item, update] = useState({
        name: "",
        price: 0,
        categoryId: 0
   })

   const localSpiderUser = localStorage.getItem("spider_user")
   const spiderUserObject = JSON.parse(localSpiderUser)

   // TODO: Get item info from API and update state
   useEffect(() => {
    fetch(`http://localhost:8088/items?categoryId=${spiderUserObject.id}`)
    .then(response => response.json())
    .then((data) => {
        const itemObject = data[0]
        updateProfile(itemObject)
    })
   },
   []
   )
   useEffect(() => {
    if (feedback !== "") {
        // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 3000);
    }
}, [feedback])

const handleSaveButtonClick = (event) => {
    event.preventDefault()
     /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
       return fetch(`http://localhost:8088/items/${item.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
       })
       .then(response => response.json())
       .then(() => {
        setFeedback("customer profile successfully saved")
       })
}

return (

    <form className="newItem">
        <h2 className="newItem__title">New Item</h2>
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
                        updateProfile(copy)

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
                        copy.price = parseFloat(evt.target.value, 2)
                        updateProfile(copy)
                    }
                } />
            </div>
        </fieldset>
        <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
    {feedback}
</div>
    </form>
)
}