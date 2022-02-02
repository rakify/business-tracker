import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateUser } from "../redux/apiCalls";
import { updateKey } from "./../redux/apiCalls";
import ErrorDisplay from "./ErrorDisplay";

const Form = styled.form`
  display: block;
  margin: auto;
  background: whitesmoke;
  width: fit-content;
`;

const Title = styled.div`
  display: block;
  margin: auto;
  font-weight: bolder;
  font-size: 20px;
  padding: 10px;
  background-color: ghostwhite;
  width: fit-content;
  border: 1px solid maroon;
`;
const Input = styled.input`
  outline: none;
  margin-bottom: 10px;
  padding: 2px;
  margin: 2px;
  text-transform: capitalize;
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
const Info = styled.div`
  color: #059;
  background-color: #bef;
  display: inline-block;
  text-align: center;
  margin: 10px 0;
  padding: 10px;
  border-radius: 3px 3px 3px 3px;
  text-transform: capitalize;
`;

export default function UpdateUser({ admin }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [inputs, setInputs] = useState({
    email: user.email,
    key: "",
    shopName: "",
    name: "",
    address: "",
    pn: "",
    note: "",
    pname: "",
    price: "",
    unit: "",
  });
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState("Set Key");
  const [keyResult, setKeyResult] = useState();
  const [next, setNext] = useState();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let customers = user.customers;
    let products = user.products;
    const customer = [
      {
        name: inputs.name
          .toLowerCase()
          .replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase()),
        _name: inputs.name.toLowerCase().replace(/\s+/g, "_"),
        pn: inputs.pn,
        address: inputs.address,
        note: inputs.note,
        reserve: 0, //initial reserve set to 0, it will update each time this person buys something
        totalCost: 0, //initial cost 0
        totalReserve: 0, // initial all reserve 0
      },
    ];
    const product = [
      {
        name: inputs.pname
          .toLowerCase()
          .replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase()),
        price: inputs.price,
        unit: inputs.unit,
      },
    ];
    if (inputs.name.length > 0) customers = [...customers, ...customer];
    if (inputs.pname.length > 0) products = [...products, ...product];
    const updatedUser = {
      email: inputs.email,
      admin_key: inputs.key,
      shopName: inputs.shopName,
      customers: customers,
      products: products,
    };
    updateUser(user._id, updatedUser, dispatch).then((res) => {
      setError(res.request);
    });
  };

  const requestKey = (e) => {
    e.preventDefault();
    setConfirm(`Please Wait..`);
    updateKey(user._id).then((res) => setKeyResult(res.request));
  };

  return (
    <>
      <Title>Welcome to Business Tracker</Title>
      <br />
      {/* If Error Fetched By Server */}
      <ErrorDisplay error={error} />
      <Form onSubmit={handleSubmit}>
        {/* When theres no customers available */}
        {!next && user.customers.length === 0 && (
          <>
            <p>
              Hi <b>{user.username}</b>,<br /> Since there is no customer
              available, we are assuming that you are new here.
            </p>
            <p>
              Welcome and hope you are the manager since you're registering.
            </p>
            <p>
              ⍟ First step is to set a key which will be required to update
              anything here and will only be available to the manager who holds
              the email (
              <b>
                <u>{user.email}</u>
              </b>
              ) associate with this account.
            </p>
            <p>⍟ If you already have the key please proceed to next.</p>
            {keyResult ? (
              <Info>{keyResult.responseText.slice(1, -1)}</Info>
            ) : (
              <Button
                style={{ background: "black", border: "1px solid aqua" }}
                onClick={(e) => requestKey(e)}
              >
                {confirm}
              </Button>
            )}
            {/* Manager already got the key so wants to proceed next */}
            <Button
              style={{ position: "fixed", right: "0" }}
              onClick={() => setNext(true)}
            >
              Next Step 〉
            </Button>
          </>
        )}
      </Form>
      <Form onSubmit={handleSubmit}>
        {/* When manager taps next */}
        {next && (
          <>
            <p>
              ⍟
              <u>
                <b>Second & Final Step</b>
              </u>
            </p>
            <p>
              All you need to do is set your business name and add a product and
              customer. You can change them later so no worries. :)
            </p>
            <Label>Business Name: </Label>
            <Input
              type="text"
              name="shopName"
              maxLength="200"
              placeholder="Business Name"
              value={inputs.shopName}
              onChange={handleChange}
              required
            />
            <br />
            {user.customers.length === 0 ? (
              <Label>Add a Customer: </Label>
            ) : (
              <Label>Customers: </Label>
            )}
            {user.customers.map((i) => i.name + ", ")}
            <Input
              style={{ textTransform: "capitalize" }}
              type="text"
              name="name"
              maxLength="100"
              placeholder={next ? "Name" : "Add Another.."}
              value={inputs.name}
              onChange={handleChange}
              required={user.customers.length === 0}
            />
            <Input
              type="text"
              name="pn"
              maxLength="11"
              placeholder="Mobile"
              value={inputs.pn}
              onChange={handleChange}
            />
            <Input
              style={{ textTransform: "capitalize" }}
              type="text"
              name="address"
              maxLength="500"
              placeholder="Address"
              value={inputs.address}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="note"
              maxLength="500"
              placeholder="Notes"
              value={inputs.note}
              onChange={handleChange}
            />
            <br />
            {user.products.length === 0 ? (
              <Label>Add a Product: </Label>
            ) : (
              <Label>Products: </Label>
            )}
            {user.products.map((i) => i.name + ", ")}
            <Input
              style={{ textTransform: "capitalize" }}
              type="text"
              name="pname"
              maxLength="20"
              placeholder={
                user.products.length === 0
                  ? "Product Name"
                  : "Add Another Product.."
              }
              value={inputs.pname}
              onChange={handleChange}
              required={user.products.length === 0}
            />
            <Input
              type="number"
              name="price"
              placeholder="Price"
              value={inputs.price}
              onChange={handleChange}
              required={user.products.length === 0}
            />
            <Input
              style={{ textTransform: "capitalize" }}
              type="text"
              name="unit"
              maxLength="20"
              placeholder="Unit"
              value={inputs.unit}
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
            <br />
            <Button>Update</Button>
            {/* Clicked next by mistake */}
            <Button
              style={{ position: "fixed", right: "0" }}
              onClick={() => setNext(false)}
            >
              〱Go Back
            </Button>
          </>
        )}
      </Form>
    </>
  );
}
