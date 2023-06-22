import { Outlet, Route, Routes } from "react-router-dom"

import { Home } from "../nav/CustomerHomeNav.js"
import { ItemContainer } from "../items/ItemContainer.js"
import { CustomerProfile } from "../../customers/CustomerProfile.js"





export const CustomerViews = () => {
   

	return (
        <Routes>
            <Route path="/" element={<Home />} />
                <Route path="items" element={< ItemContainer />}
                />
                 <Route path="profile" element={< CustomerProfile />}
                />

               
            
        </Routes>
    )
}