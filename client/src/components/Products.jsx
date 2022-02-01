import React,{ useState, useEffect } from "react";
import styled from "styled-components";
import Topbar from "./Topbar";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import RemoveProduct from "./RemoveProduct";

const Form = styled.form`
  display: flex;
  gap: 15px;
  ${mobile({ flexDirection: "column" })}
`;

const TABLE = styled.table`
  width: 100%;
`;

const TBODY = styled.tbody`
  &:nth-child(even) {
    background-color: #d7e5f1;
  }
  background-color: #e5ecf0;
`;
const TR = styled.tr`
  display: flex;
`;
const THEAD = styled.thead``;
const TH = styled.th`
  flex: 1;
  text-align: left;
  border-bottom: 1px solid black;
  padding: 10px;
  background-color: #8aa18a;
  border-right: 1px solid white;
`;
const TD = styled.td`
  flex: 1;
  text-align: left;
  padding: 10px;
  border-right: 1px solid white;
`;
const Button = styled.button`
  background-color: #132513;
  margin-right: 5px;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 250;
`;

const Products = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [products, setProducts] = useState(user.products);
  const [editId, setEditId] = useState("");
  const [removeId, setRemoveId] = useState("");

  useEffect(() => {
    setProducts(user.products);
  }, [user.products]);

  const handleEdit = (e, product) => {
    e.preventDefault();
    setEditId(product._id);
    setRemoveId("");
  };
  const handleRemove = (e, product) => {
    e.preventDefault();
    setRemoveId(product._id);
    setEditId("");
  };

  return (
    <>
      <Topbar />
      <Form>
        <TABLE>
          <THEAD>
            <TR>
              <TH>Name</TH>
              <TH>Price</TH>
              <TH>Unit</TH>
              <TH>Actions</TH>
            </TR>
          </THEAD>
          <TBODY>
            {products.map((product) => (
              <React.Fragment key={product._id}>
                {editId === product._id ? (
                  <EditProduct c={product} />
                ) : removeId === product._id ? (
                  <RemoveProduct c={product} />
                ) : (
                  <TR>
                    <TD>{product.name}</TD>
                    <TD>{product.price}</TD>
                    <TD>{product.unit}</TD>
                    <TD>
                      <Button onClick={(e) => handleEdit(e, product)}>
                        Edit
                      </Button>
                      <Button onClick={(e) => handleRemove(e, product)}>
                        Remove
                      </Button>
                    </TD>
                  </TR>
                )}
              </React.Fragment>
            ))}
          </TBODY>
        </TABLE>
      </Form>

      <AddProduct />
    </>
  );
};

export default Products;
