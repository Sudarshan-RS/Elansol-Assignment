import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";


export const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    dob: "",
    password: "",
  });
  
  const navigate = useNavigate();
  const { storeTokenInLS, API } = useAuth();
  const URL = `${API}/api/auth/register`;
  // Handling the input values
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handling form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert("Registration Successful");

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      console.log("res form server", res_data);
      if (response.ok) {
        // console.log("token", res_data.token);
        // localStorage.setItem('token', res_data.token)
        storeTokenInLS(res_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration successful");
        navigate("/");
      }else{
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main>
        <section>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="reg-img">
                <img
                  src="/images/register.png"
                  alt="a girl is trying to do register"
                  width="500"
                  height="500"
                />
              </div>
              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1>
                <br />
                <form action="" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name">name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter your name..."
                      autoComplete="off"
                      required
                      value={user.name}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email..."
                      autoComplete="off"
                      required
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="dob">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      id="dob"
                      placeholder="Enter your date of birth..."
                      autoComplete="off"
                      required
                      value={user.dob}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your password..."
                      autoComplete="off"
                      required
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <button type="submit" className="btn-submit">
                    Register Now!
                  </button>
                  <button className="btn-submit ms-2">
                  <Link to="/">back to login</Link>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
