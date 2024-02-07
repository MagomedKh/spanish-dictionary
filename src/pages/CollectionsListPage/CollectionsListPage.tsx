import { FC, useEffect, useState } from "react";
import CollectionsList from "../../components/CollectionsList";
import { Button, Flex, Grid, Typography } from "antd";
import styles from "./CollectionsListPage.module.css"; // Import css modules stylesheet as styles
import {
   DocumentData,
   QuerySnapshot,
   addDoc,
   collection,
   onSnapshot,
} from "firebase/firestore";
import { ICard } from "../../models/Collection";
import { db } from "../../store/firebase";
import { AppModel } from "../../models/AppModel";
import { useDispatch } from "react-redux";
import { selectCards, setCards } from "../../store/slices/CollectionsSlice";
import { useSelector } from "react-redux";
import { CREATE_CARD } from "../../store/actionTypes";
import { createCard, getCards } from "../../store/saga/cardsSaga";
import { getNextObjId } from "../../utils/getNextObjId";
import { useNavigate } from "react-router-dom";
import { CollectionPageNavState } from "../../models/CollectionPageNavState";

const cardsCollection = collection(db, "cards");

const CollectionsListPage: FC = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const cards = useSelector(selectCards);

   const handleCreateCard = async () => {
      const id = getNextObjId(cards);
      dispatch(
         createCard({
            title: `Новый набор ${parseInt(id) + 1}`,
            coverImage: "https://placehold.co/600x400/png",
            configs: "conf",
            words: [],
            id,
         })
      );

      navigate(`/collections/${id}`, {
         state: { isNew: true } as CollectionPageNavState,
      });
   };

   return (
      <div className={styles.page}>
         <Flex justify="space-between" align="center">
            <Typography.Title>Наборы слов</Typography.Title>

            <Button
               onClick={handleCreateCard}
               className={styles.addBtn}
               type="primary"
            >
               Создать новый набор
            </Button>
         </Flex>

         <CollectionsList />
      </div>
   );
};

export default CollectionsListPage;
