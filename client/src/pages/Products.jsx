import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import AddProduct from "../components/AddProduct";
import EditProduct from "../components/EditProduct";
import RemoveProduct from "../components/RemoveProduct";

const Form = styled.form`
  display: flex;
  gap: 15px;
  ${mobile({ flexDirection: "column" })}
`;
const TITLE = styled.div`
  font-weight: bolder;
  display: inline;
  font-size: 20px;
`;
const TABLE = styled.table`
  width: 100%;
`;

const TBODY = styled.tbody``;
const TR = styled.tr``;
const THEAD = styled.thead``;
const TH = styled.th`
  text-align: left;
  border-bottom: 2px solid black;
  padding: 10px;
  &:last-child {
    background-color: #d7e5f1;
  }
  background-color: #8aa18a;
  border-right: 1px solid white;
`;
const TD = styled.td`
  text-align: left;
  padding: 10px;
  &:last-child {
    background-color: #d7e5f1;
  }
  border-bottom: 1px solid black;
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
      <TITLE>Products</TITLE>
      <Form>
        <TABLE>
          <THEAD>
            <TR>
              <TH>Name</TH>
              <TH>Price</TH>
              <TH>Unit</TH>
              <TH>Control</TH>
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
                        Delete
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
