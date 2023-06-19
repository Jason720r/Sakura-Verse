import { Outlet, Route, Routes } from "react-router-dom"

import { Home } from "../nav/HomeNav.js"
import { ItemContainer } from "../items/ItemContainer.js"





export const CustomerViews = () => {
   

	return (
        <Routes>
            <Route path="/" element={<Home />} />
                <Route path="items" element={< ItemContainer />}
                />

               
            
        </Routes>
    )
}