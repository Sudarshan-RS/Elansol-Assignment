import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { NavLink } from "react-router-dom";

// import axios from 'axios';
// import {Link}  from "react-router-dom";

export const Home = () => {
  const { authorizationToken, API } = useAuth();
  const [ users, setUsers ] = useState([]);

  // getAllUsersData();
  const getAllUsersData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setUsers(data);
      console.log(data, "home data");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
      <div className="container flex flex-justify-between ms-2">
        <h1>Users Data</h1>
        <button className="logout-btn"><NavLink to="/logout">Logout</NavLink></button>
      </div>
      <div className="container admin-users">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {/* map through the array of users and create a new row for each user */}
            {users.map((curUser) => {
              const {name, email, dob} = curUser
                  return (
                    <tr key={email}>
                      <td>{name}</td>
                      <td>{email}</td>
                      <td>{dob}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </>
  );
};
