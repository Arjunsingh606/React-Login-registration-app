import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/hooks";
import { Table } from "react-bootstrap";
import { getUsers } from "../store/userSlice";
import { RootState } from "../store/store";
import '../style/timer.css'

const Home: React.FC = () => {
  const { data, status } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const loggedInUser = sessionStorage.getItem("userEmail");
  useEffect(() => {
    dispatch(getUsers());
  }, [getUsers]);


  const handleLoggOut = () => {
    sessionStorage.removeItem("userEmail");
    window.location.href = "/";
  }

  return (
    <>
      <div className="container">
        <div className="row"></div>
        <div className="col">
          <div className="user-table">
            <h3 className="text-center m-4">Users Table</h3>
            <button onClick={handleLoggOut} className="home-btn">Log out</button>
          </div>
          <Table striped bordered table-responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Home;
