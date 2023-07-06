import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = () => {
    const [customer, setCustomer] = useState({
        email: "",
        name: "",
        bio: "",
        isStaff: false
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("spider_user", JSON.stringify({
                        id: createdUser.id,
                        staff: createdUser.isStaff
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${customer.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = {...customer}
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login custom-form" onSubmit={handleRegister}>
                <h1 className="custom-description2">Please Register for the Sakura-Verse</h1>
                <fieldset>
                    <label  className="custom-description" htmlFor="name"> Name </label>
                    <input style={{ backgroundColor: 'white' }}onChange={updateCustomer}
                           type="text" id="name" className="form-control"
                           placeholder="Add a little Pizzazz" required autoFocus />
                </fieldset>
                <fieldset>
                    <label className="custom-description" htmlFor="email"> Email address </label>
                    <input style={{ backgroundColor: 'white' }} onChange={updateCustomer}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label className="custom-description" htmlFor="bio"> About you </label>
                    <input style={{ backgroundColor: 'white' }}onChange={updateCustomer}
                        type="bio" id="bio" className="form-control"
                        placeholder="What kind of spider are you?" required />
                </fieldset>
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = {...customer}
                        copy.isStaff = evt.target.checked
                        setCustomer(copy)
                    }}
                        type="checkbox" id="isStaff" />
                    <label  className="custom-description"htmlFor="email"> Universe 616 </label>
                </fieldset>
                <fieldset>
                    <button type="submit" className="btn btn-dark-red"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

