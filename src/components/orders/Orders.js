import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const ItemsList = () => {
    const [items, setItems] = useState([])
    const [filteredItems, setFiltered] = useState([])
    const [lowPrice, setLowPrice] = useState(false)
    const navigate = useNavigate()



    const localSpiderUser = localStorage.getItem("spider_user")
    const spiderUserObject = JSON.parse(localSpiderUser)


    useEffect(
        () => {
            return fetch(`http://localhost:8088/items`)
            .then(response => response.json())
            .then((ItemsArray) => {
                setItems(ItemsArray)
            })
        },
        []
    )

    useEffect(
        () => {
            if (lowPrice) {
                const lowPriceItems = items.filter(item => item.price > 30.00)
                setFiltered(lowPriceItems)
            }
            else {
                setFiltered(items)
            }
        },
        [lowPrice]
    )
    

    return <>
    {
        spiderUserObject.staff
        ? <>
        <button onClick={ () => setLowPrice(true) } >Cheap Items</button>
        <button onClick={ () => setLowPrice(false) } >Show All</button>
        </>
        : <>
        <button onClick={ () => navigate("/item/create")}>Create Order</button>
      </>
      

    }
    <h2>List of Items</h2>

    <article className="items">
        {
            filteredItems.map(
                (food) => {
                    return <section className="item">
                    <ul>{food.name}</ul>
                    <ul>{food.price}</ul>
                    </section>
                }
            )
        }
    </article>
    </>

}

