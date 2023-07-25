import React, { useState, useEffect } from "react";
import AdminNavigation from "../AdminNavigation/AdminNavigation";
import AddGifts from "./AddGifts";
import AdminGiftsTable from "./AdminGiftsTable";
import "./AdminGifts.css";
import EditGift from "./EditGift";
import "./EditGifts.css";
import axios from "axios";
import Preloader from "./Preloader";
import { useAuthenticationAdmin } from "../../Routing/routing";
const AdminGifts = () => {
  useAuthenticationAdmin();
  const [addOrEditGifts, setAddOrEditGifts] = useState(true);

  const [gifts, setGifts] = useState([]);
  useEffect(() => {
    fetchGifts();
  }, []);
  const fetchGifts = () => {
    axios.get("http://localhost:5035/admin/getGift").then((response) => {
      console.log(response);
      setGifts(response.data.gifts);
    });
  };
  const addGift = (newGift) => {
    const gift = {
      giftImageUrl: newGift.giftImageUrl,
      giftName: newGift.giftName,
      giftPrice: newGift.giftPrice,
      giftQuantity: newGift.giftQuantity,
      giftDetails: newGift.giftDetails,
    };
    console.log(gift);
    console.log("added");
    axios
      .post(`http://localhost:5035/admin/addGift`, {
        giftImageUrl: newGift.giftImageUrl,
        giftName: newGift.giftName,
        giftPrice: newGift.giftPrice,
        giftQuantity: newGift.giftQuantity,
        giftDetails: newGift.giftDetails,
      })
      .then((response) => {
        console.log(response);
        const addedGift = response.data.gift;
        setGifts((prevGifts) => [...prevGifts, addedGift]);
        console.log(gifts);
      })
      .catch((error) => console.log(error));
  };
  const [giftToBeEdit, setGiftToBeEdit] = useState(null);
  const EditedGift = (gift) => {
    setGiftToBeEdit(gift);
    setAddOrEditGifts(false);
    console.log(gifts);
    console.log("edited");
  };
  const deletedGift = (id) => {
    console.log(gifts);
    console.log("deleted");
    axios.delete(`http://localhost:5035/admin/deleteGift/${id}`);
  };
  const changeCondition = (bool) => {};
  const updateHandler = (gift) => {
    axios
      .put(`http://localhost:5035/admin/editGift/${gift.id}`, {
        GiftName: gift.name,
        GiftImageUrl: gift.url,
        GiftDetails: gift.details,
        GiftPrice: gift.price,
        GiftQuantity: gift.quantity,
      })
      .then((response) => {
        const updatedGift = response.data.gift;
        setGifts((prevGifts) =>
          prevGifts.map((prevGift) =>
            prevGift.giftId === updatedGift.giftId ? updatedGift : prevGift
          )
        );
        setAddOrEditGifts(true);
        console.log(gifts);
        console.log(response);
      });
  };
  if (!gifts) {
    return <Preloader />;
  }
  return (
    <div className="adminGifts-wrapper">
      <AdminNavigation active="gifts" />
      {addOrEditGifts ? (
        <div className="giftsTable-addGifts">
          <AdminGiftsTable
            key={gifts}
            EditGift={EditedGift}
            deleteGiftHandler={deletedGift}
            gifts={gifts}
          />
          <AddGifts addNewGift={addGift} />
        </div>
      ) : (
        <div className="editGifts-wrapper">
          <EditGift
            onUpdateHandler={updateHandler}
            changeComponent={changeCondition}
            gift={giftToBeEdit}
          />
        </div>
      )}
    </div>
  );
};
export default AdminGifts;
