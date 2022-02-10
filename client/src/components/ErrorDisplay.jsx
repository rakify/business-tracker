import styled from "styled-components";

const Error = styled.div`
  width: fit-content;
  left: 33%;
  right: 33%;
  position: relative;
  border-left: 5px solid;
  padding: 15px 10px 15px 50px;
`;

const ErrorDisplay = ({ error }) => {
  return (
    <>
      {/* If Error Fetched By Server */}
      {error && error.status === 200 && (
        <Error
          style={{
            color: "#270",
            backgroundColor: "#DFF2BF",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "3px 3px 3px 3px",
          }}
        >
          Updated Successfully.
        </Error>
      )}
      {error && error.status !== 200 && (
        <Error
          style={{
            color: "#D8000C",
            backgroundColor: "#FFBABA",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "3px 3px 3px 3px",
          }}
        >
          {error?.responseText?.slice(1, -1)}
        </Error>
      )}
    </>
  );
};

export default ErrorDisplay;
