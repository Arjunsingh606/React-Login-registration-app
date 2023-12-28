import React from "react";
import {useSelector } from "react-redux";
import { useAppDispatch } from "../store/hooks";
import { Table } from "react-bootstrap";
import { getUsers } from "../store/userSlice";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
        
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Home;
