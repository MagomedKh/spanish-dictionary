import { Button } from "antd";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createCard } from "../../../store/sagas/cardsSaga";
import { openCard, selectCards } from "../../../store/slices/CollectionsSlice";
import { CollectionPageNavState } from "../../../types/CollectionPageNavState";
import { getNextObjId } from "../../../utils/getNextObjId";
import styles from "./AddCardBtn.module.scss";

const AddCardBtn: FC = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const cards = useSelector(selectCards);

   const handleCreateCard = () => {
      const id = getNextObjId(cards);
      const card = {
         title: `Новый набор ${parseInt(id) + 1}`,
         coverImage: "https://placehold.co/600x400/png",
         configs: "conf",
         words: [],
         id,
      };

      dispatch(openCard(card));
      dispatch(createCard(card));

      navigate(`/collections/${id}`, {
         state: { isNew: true } as CollectionPageNavState,
      });
   };

   return (
      <Button onClick={handleCreateCard} className={styles.addBtn} type="primary">
         Создать новый словарь
      </Button>
   );
};

export default AddCardBtn;
