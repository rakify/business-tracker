import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../redux/apiCalls";
import { updateKey } from "../redux/apiCalls";
import Topbar from "./Topbar";
import ErrorDisplay from "./ErrorDisplay";

const Container = styled.div`
  display: flex;
`;
const Sidebar = styled.div`
  flex: 1;
`;
const Form = styled.form`
  flex: 9;
`;
const TITLE = styled.div`
  font-weight: bolder;
  display: inline;
  font-size: 20px;
`;
const Title = styled.div`
  font-weight: bolder;
  font-size: 15px;
  padding: 5px;
  border-left: 3px solid gray;
  width: fit-content;
  background-color: ghostwhite;
  cursor: pointer;
`;
const Input = styled.input`
  outline: none;
  margin-bottom: 10px;
  padding: 2px;
  margin: 2px;
  width: 50%;
  display: flex;
`;
const Label = styled.label`
  color: #132513;
  font-weight: bolder;
`;
const Button = styled.button`
  background-color: #132513;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 250;
`;

export default function Settings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [inputs, setInputs] = useState({
    email: user.email,
    admin_key: "",
    username: user.username,
    password: "",
    language: user.language || "",
    shopName: user.shopName || "",
    shopAddress: user.shopAddress || "",
    shopDetails: user.shopDetails || "",
    shopOfficePn: user.shopOfficePn || "",
    shopOtherPn: user.shopOtherPn || "",
    shopSignature: user.shopSignature || "",
    shopBanner: user.shopBanner || "",
  });
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState("Set Key");
  const [keyResult, setKeyResult] = useState();
  const [showSidebar, setShowSidebar] = useState(false);
  const [nowShowing, setNowShowing] = useState("account");

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let customers = user.customers;
    let products = user.products;
    const updatedUser = {
      email: inputs.email,
      admin_key: inputs.key,
      customers: customers,
      products: products,
      username: inputs.username,
      language: inputs.language,
      shopName: inputs.shopName,
      shopBanner: inputs.shopBanner,
      shopAddress: inputs.shopAddress,
      shopDetails: inputs.shopDetails,
      shopOfficePn: inputs.shopOfficePn,
      shopOtherPn: inputs.shopOtherPn,
      shopSignature: inputs.shopSignature,
    };
    updateUser(user._id, updatedUser, dispatch).then((res) => {
      setError(res.request);
    });
  };

  return (
    <>
      <Topbar />
      <ErrorDisplay error={error} />
      <Container>
        {!showSidebar && <Title onClick={() => setShowSidebar(true)}>︾</Title>}
        {showSidebar && (
          <Sidebar>
            {nowShowing === "account" ? (
              <Title
                style={{ border: "1px solid green", background: "#ECEAE0" }}
              >
                Your Account
              </Title>
            ) : (
              <Title onClick={() => setNowShowing("account")}>
                Your Account
              </Title>
            )}
            {nowShowing === "business" ? (
              <Title
                style={{ border: "1px solid green", background: "#ECEAE0" }}
              >
                Business Info
              </Title>
            ) : (
              <Title onClick={() => setNowShowing("business")}>
                Business Info
              </Title>
            )}
            <Title onClick={() => setShowSidebar(false)}>︽</Title>
          </Sidebar>
        )}
        {nowShowing === "account" && (
          <Form onSubmit={handleSubmit}>
            {!showSidebar && <TITLE>Account Settings</TITLE>}
            <br />
            <Label>Username: </Label>
            <Input
              type="text"
              name="username"
              maxLength="100"
              value={inputs?.username}
              onChange={(e) => handleChange(e)}
              required
            />
            <br />
            <Label>Manager Email Address: </Label>
            <Input
              style={{ textTransform: "lowercase" }}
              type="email"
              name="email"
              maxLength="100"
              value={inputs?.email}
              onChange={(e) => handleChange(e)}
              required
            />
            <br />
            <Label>Your Access Key: </Label>
            <Input
              style={{
                outline: "none",
                fontSize: "12px",
                width: "fit-content",
              }}
              maxLength="4"
              minLength="4"
              type="number"
              name="key"
              placeholder="Key"
              value={inputs?.key}
              onChange={(e) => handleChange(e)}
              required
            />
            <br />
            <Button>Update</Button>
          </Form>
        )}
        {nowShowing === "business" && (
          <Form onSubmit={handleSubmit}>
            {!showSidebar && <TITLE>Business Info</TITLE>}
            <br />
            <Label>Business Name: </Label>
            <Input
              type="text"
              name="shopName"
              maxLength="500"
              placeholder="Business Name"
              value={inputs?.shopName}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <Label>Details: </Label>
            <Input
              type="text"
              name="shopDetails"
              maxLength="1000"
              placeholder="Details"
              value={inputs?.shopDetails}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <Label>Address: </Label>
            <Input
              type="text"
              name="shopAddress"
              maxLength="1000"
              placeholder="Business Address"
              value={inputs?.shopAddress}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <Label>Banner: </Label>
            <Input
              type="text"
              name="shopBanner"
              maxLength="1000"
              placeholder="Banner Link"
              value={inputs?.shopBanner}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <Label>Office Phone: </Label>
            <Input
              type="text"
              name="shopOfficePn"
              maxLength="12"
              placeholder="Office Phone"
              value={inputs?.shopOfficePn}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <Label>Other Phone: </Label>
            <Input
              type="text"
              name="shopOtherPn"
              maxLength="1000"
              placeholder="Other Phone"
              value={inputs?.shopOtherPn}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <Label>Signature: </Label>
            <Input
              type="text"
              name="shopSignature"
              maxLength="1000"
              placeholder="Signature Link"
              value={inputs?.shopSignature}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <Label>Your Access Key: </Label>
            <Input
              style={{
                outline: "none",
                fontSize: "12px",
                width: "50px",
              }}
              maxLength="4"
              minLength="4"
              type="number"
              name="key"
              placeholder="key"
              value={inputs?.key}
              onChange={(e) => handleChange(e)}
              required
            />
            <br />
            <Button>Update</Button>
          </Form>
        )}
      </Container>
    </>
  );
}
