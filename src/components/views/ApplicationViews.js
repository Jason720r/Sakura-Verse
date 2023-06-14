import { CustomerViews } from "./CustomerView.js"
import { EmployeeViews } from "./EmployeeView.js"




export const ApplicationViews = () => {
	const localSpiderUser = localStorage.getItem("spider_user")
    const spiderUserObject = JSON.parse(localSpiderUser)

	if (spiderUserObject.staff) {

		return <EmployeeViews />
	}
	else {

		return <CustomerViews />
	}
}

