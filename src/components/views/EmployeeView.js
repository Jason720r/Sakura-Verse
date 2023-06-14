import { Outlet, Route, Routes } from "react-router-dom"
import { ItemsList } from "../orders/Orders.js"


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
            </Route>
        </Routes>
    )
}