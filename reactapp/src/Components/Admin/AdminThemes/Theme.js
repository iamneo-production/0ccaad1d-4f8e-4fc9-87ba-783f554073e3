import React, { useRef } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAuthenticationAdmin } from "../../Routing/routing";
import "./Theme.css";
const Theme = (props) => {
  useAuthenticationAdmin();
  const parentRef = useRef(null);
  const themeDeleteHandler = () => {
    props.onDelete(props.themes.themeId);
  };
  const editTheme = () => {
    const theme = {
      themeId: props.themes.themeId,
      themeName: props.themes.themeName,
      themePrice: props.themes.themePrice,
      themeDetails: props.themes.themeDetails,
    };
    console.log(theme);
    props.editThemeHandler(theme);
  };
  return (
    <div
      className="themes"
      ref={parentRef}
      id={`themeGrid${props.themes.themeId}`}
    >
      <div className="theme-container">
        <p>
          Theme Name : <span>{props.themes.themeName}</span>
        </p>
        <p>
          Theme Price : <span>{props.themes.themePrice}</span>
        </p>
        <p>
          Theme Details : <span>{props.themes.themeDetails}</span>
        </p>
      </div>
      <div className="edit-deletes">
        <FaEdit onClick={editTheme} className="edit-icons" id="editTheme" />
        <FaTrash
          onClick={themeDeleteHandler}
          className="delete-icons"
          id="DeleteTheme"
        />
      </div>
    </div>
  );
};
export default Theme;
