import { DocumentData, QuerySnapshot, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cardsCollection } from "../firebase/firebase";
import { setCards, setIsLoading } from "../store/slices/CollectionsSlice";
import { ICard } from "../types/Collection";

export const useFetchCards = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setIsLoading(true));

      onSnapshot(cardsCollection, (querySnapshot: QuerySnapshot<DocumentData>) => {
         const cards = querySnapshot.docs.map((doc) => doc.data() as ICard);

         dispatch(setCards(cards));
      });
   }, []);
};
