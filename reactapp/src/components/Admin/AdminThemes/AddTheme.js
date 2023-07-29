import React, { useRef, useState } from "react";
import { useAuthenticationAdmin } from "../../Routing/routing";
const AddTheme = (props) => {
  useAuthenticationAdmin();
  const nameRef = useRef("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [danger, setDanger] = useState("");
  const addOrUpdate = (name, price, description) => {
    props.onAddOrUpdate(name, price, description);
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if(name === "" || price ==="" || description === ""){
            setDanger("All fields are required")
          }
          else if(Number (price) < 0){
            setDanger("Price must be greater than zero")
          }
          else{
            setDanger("")
          addOrUpdate(name, price, description);
          setName("")
          setPrice("")
          setDescription("")
          }
        }}
      >
        <h2 style={{ textAlign: "center" }}>Add theme</h2>
        <p style={{'textAlign':'center','color':'red'}}>{danger}</p>
        <div className="form-input">
          <input
            type="text"
            placeholder="Enter the theme name"
            id={props.themeId[0]}
            value={name}
            ref={nameRef}
            onChange={(e) => {
              setName(e.target.value);
              console.log(name, price, description);
            }}
          />
        </div>
        <div className="form-input">
          <input
            type="text"
            placeholder="Enter the theme price"
            id={props.themeId[1]}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div className="form-input">
          <input
            type="text"
            placeholder="Enter the theme description"
            id={props.themeId[2]}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="btn">
          <button>{props.themeId[3]}</button>
        </div>
      </form>
    </div>
  );
};
export default AddTheme;
