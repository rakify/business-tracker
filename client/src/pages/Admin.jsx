import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getEntry, getUser } from "../redux/apiCalls";
import { useEffect } from "react";
import Topbar from "../components/Topbar";
import EntryForm from "../components/EntryForm";
import UpdateUser from "../components/UpdateUser";

const Container = styled.div``;

const Admin = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const Month = [];
  Month[0] = "January";
  Month[1] = "February";
  Month[2] = "March";
  Month[3] = "April";
  Month[4] = "May";
  Month[5] = "June";
  Month[6] = "July";
  Month[7] = "August";
  Month[8] = "September";
  Month[9] = "October";
  Month[10] = "November";
  Month[11] = "December";
  const d = new Date();
  let monthId = d.getMonth();
  let year = d.getFullYear();

  useEffect(() => {
    getEntry(user.username, monthId, year, dispatch);
    getUser(user.username, dispatch);
  }, [user, dispatch, monthId, year]);

  return (
    <Container>
      <Topbar />
      {(user.customers.length === 0 || user.products.length === 0) && (
        <UpdateUser />
      )}
      {user.customers.length > 0 && user.products.length > 0 && (
        <>{user && <EntryForm />}</>
      )}
    </Container>
  );
};

export default Admin;
