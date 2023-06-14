
import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"


export const NavBar = () => {
    const localSpiderUser = localStorage.getItem("spider_user")
    const spiderUserObject = JSON.parse(localSpiderUser)

    if(spiderUserObject.staff) {

        return <EmployeeNav />
    }
    else {
        return <CustomerNav />
    }
}

