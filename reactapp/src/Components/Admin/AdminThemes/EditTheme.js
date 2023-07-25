import React, { useState } from "react";
import { useAuthenticationAdmin } from "../../Routing/routing";
const EditTheme = (props) => {
  useAuthenticationAdmin();
  const [id, setId] = useState(props.updatedValue.themeId);
  const [name, setName] = useState(props.updatedValue.themeName);
  const [price, setPrice] = useState(props.updatedValue.themePrice);
  const [details, setDetails] = useState(props.updatedValue.themeDetails);
  const afterUpdate = () => {
    const bool = 1;
    const theme = {
      themeId: id,
      themeName: name,
      themePrice: price,
      themeDetails: details,
    };
    props.backToHome(theme, bool);
  };
  return (
    <>
      <div className="addTheme-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            afterUpdate();
          }}
        >
          <h2 style={{ textAlign: "center" }}>Edit theme</h2>
          <div className="form-input">
            <input
              type="text"
              placeholder="Enter the theme name"
              id="editThemeName"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="form-input">
            <input
              type="text"
              id="EditThemePrice"
              placeholder="Enter the theme price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className="form-input">
            <input
              type="text"
              id="EditThemeDecription"
              placeholder="Enter the theme description"
              value={details}
              onChange={(e) => {
                setDetails(e.target.value);
              }}
            />
          </div>
          <div className="btn">
            <button id="update">UPDATE</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default EditTheme;
