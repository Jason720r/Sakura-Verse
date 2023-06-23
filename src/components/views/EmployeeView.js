import { Outlet, Route, Routes } from "react-router-dom"
import { ItemsList } from "../orders/Orders.js"
import { ItemForm } from "../employees/EmployeeItem.js"

import { ItemDelete } from "../employees/EmployeeModifyItem.js"
import { CustomerOrder } from "../employees/ViewCustomerOrders.js"





export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                   

                    <Outlet />
                </>
            }>
                <Route path="items" element={< ItemsList />}/>
                <Route path="/" element={<CustomerOrder />} />
                <Route path="itemDelete" element={< ItemDelete />}/>
            
            <Route path="food" element={< ItemForm />}/>
            </Route>
        </Routes>
    )
}