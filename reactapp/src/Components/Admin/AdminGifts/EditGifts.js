import React from "react";
import AdminNavigation from "../AdminNavigation/AdminNavigation";
import EditGift from "./EditGift";
import "./EditGifts.css";
const EditGifts = () => {
  const id = [
    "editGiftName",
    "editGiftPrice",
    "editGiftImageUrl",
    "editGiftQuantity",
    "editGiftDetails",
    "updateGiftButton",
    "UPDATE",
  ];
  return (
    <>
      <AdminNavigation />
      <div className="editGifts-wrapper">
        <EditGift id={id} />
      </div>
    </>
  );
};
export default EditGifts;
