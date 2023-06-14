import { Outlet, Route, Routes } from "react-router-dom"
import { ItemsList } from "../orders/Orders.js"




export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Sakura-Verse</h1>
                    <div>Welcome to the Omni-Dimensional Japanese Super Duper Spider Delivery Service!</div>

                    <Outlet />
                </>
            }>
                <Route path="items" element={< ItemsList />}/>

               
            </Route>
        </Routes>
    )
}