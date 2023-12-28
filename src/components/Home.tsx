import React from "react";
import {useSelector } from "react-redux";
import { useAppDispatch } from "../store/hooks";
import { Table } from "react-bootstrap";
import { getUsers } from "../store/userSlice";
import { RootState } from "../store/store";

const Home: React.FC = () => {
  const data = useSelector((state:RootState)=>state.user.data);
  console.log(data, "cheching data ");
  
  const appData = data?.map((item)=>{
    console.log(item, "data"); 
  })
  console.log(appData, "hwegjhegdfjh");
  
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
