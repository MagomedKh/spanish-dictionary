import { DocumentData, QuerySnapshot, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { ICard } from "../models/Collection";
import { cardsCollection } from "../store/firebase";
import { useDispatch } from "react-redux";
import { setCards } from "../store/slices/CollectionsSlice";

export const useFetchCards = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      onSnapshot(
         cardsCollection,
         (querySnapshot: QuerySnapshot<DocumentData>) => {
            const cards = querySnapshot.docs.map((doc) => doc.data() as ICard);

            dispatch(setCards(cards));
         }
      );
      // dispatch(getCards());
   }, []);
};
