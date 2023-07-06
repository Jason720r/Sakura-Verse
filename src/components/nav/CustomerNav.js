import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const CustomerNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active ">
                <Link className="navbar__link btn btn-dark-red" to="/items"> Order</Link>
            </li>
            { <li className="navbar__item active">
                <Link className="navbar__link btn btn-dark-red" to="/">Home</Link>
            </li> }
            { <li className="navbar__item active">
                <Link className="navbar__link btn btn-dark-red" to="/profile">Profile</Link>
            </li> }
            { <li className="navbar__item active">
                <Link className="navbar__link btn btn-dark-red" to="/info">About Us</Link>
            </li> }
            {
                localStorage.getItem("spider_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link btn btn-dark-red" to="" onClick={() => {
                            localStorage.removeItem("spider_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}