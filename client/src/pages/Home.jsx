import { useSelector } from "react-redux";
import Topbar from "../components/Topbar";
import EntryList from "../components/EntryList";
import UpdateUser from "../components/UpdateUser";

const Home = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Topbar />
      {user.customers.length === 0 && <UpdateUser />}
      {user.customers.length > 0 && (
        <>
          <EntryList />
        </>
      )}
    </>
  );
};

export default Home;
