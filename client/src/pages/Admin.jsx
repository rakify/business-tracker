import styled from "styled-components";
import { useSelector } from "react-redux";
import Topbar from "../components/Topbar";
import EntryForm from "../components/EntryForm";
import UpdateUser from "../components/UpdateUser";

const Container = styled.div``;

const Admin = () => {
  const user = useSelector((state) => state.user.currentUser);

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
