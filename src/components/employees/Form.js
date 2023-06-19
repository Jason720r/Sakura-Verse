import { ItemForm } from "./EmployeeItem.js";

export const Item = () => {
    const localSpiderUser = localStorage.getItem("spider_user")
    const spiderUserObject = JSON.parse(localSpiderUser)

    if (spiderUserObject.staff) {
        return <ItemForm/>
    }
}