import { Outlet, Route, Routes } from "react-router-dom"
import { ItemsList } from "../orders/Orders.js"
import { ItemForm } from "../employees/EmployeeItem.js"
import { CustomerOrder } from "../employees/ViewCustomerOrders.js"





export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Sakura-Verse Employee-Page</h1>
                    <div>Are you happy working tirelessly everyday, barely scraping by and wishing YOU could find your dream job? Well, this isn't it you clown.</div>

                    <Outlet />
                </>
            }>
                <Route path="items" element={< ItemsList />}/>
                <Route path="customOrder" element={< CustomerOrder />}/>
            
            <Route path="food" element={< ItemForm />}/>
            </Route>
        </Routes>
    )
}