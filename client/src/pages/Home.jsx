import { useSelector } from "react-redux";
import Topbar from "../components/Topbar";
import EntryList from "../components/EntryList";
import UpdateUser from "../components/UpdateUser";
import FinalReport from "../components/FinalReport";

const Home = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Topbar />
      {user.customers.length === 0 && <UpdateUser />}
      {user.customers.length > 0 && (
        <>
          <FinalReport />
          <EntryList />
        </>
      )}
    </>
  );
};

export default Home;
