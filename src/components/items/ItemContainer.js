import { useState } from "react"
import { ItemSearch } from "./ItemSearch"
import { ItemsList } from "../orders/Orders"

export const ItemContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
    <ItemSearch setterFunction={setSearchTerms}/>
    <ItemsList searchTermState={searchTerms}/>
    </>
}