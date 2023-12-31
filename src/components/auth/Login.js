import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleLogin = (e) => {
    e.preventDefault();

    return fetch(`http://localhost:8088/users?email=${email}`)
      .then((res) => res.json())
      .then((foundUsers) => {
        if (foundUsers.length === 1) {
          const user = foundUsers[0];
          localStorage.setItem("spider_user", JSON.stringify({
            id: user.id,
            staff: user.isStaff
          }));

          navigate("/");
        } else {
          window.alert("Invalid login");
        }
      });
  };

  const handleMouseMove = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    document.body.style.cursor = "none";
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.body.style.cursor = "default";
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main className="container--login">
      <section>
        <form className="form--login custom-form" onSubmit={handleLogin}>
          <h1 id="sakura-verse-heading">The Amazing Sakura-Verse</h1>
          <fieldset className="text-center" style={{ marginTop: "2rem" }}>
            <fieldset>
              <input
                type="email"
                style={{ backgroundColor: "white" }}
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                className="form-control text-center custom-input"
                placeholder="Email address"
                required
                autoFocus
              />
            </fieldset>
          </fieldset>
          <fieldset className="text-center" style={{ marginTop: "2rem" }}>
            <button type="submit" className="btn btn-dark-red">
              Sign in
            </button>
          </fieldset>
        </form>
      </section>
      <section className="link--register">
        <Link to="/register">Not a member yet?</Link>
      </section>
      <div
        className="trailing-effect"
        style={{ left: mousePosition.x, top: mousePosition.y }}
      ></div>
    </main>
  );
};
