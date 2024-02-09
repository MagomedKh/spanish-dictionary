import { DocumentData, QuerySnapshot, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { dictionariesCollection } from "../firebase/firebase";
import { setDictionaries, setIsLoading } from "../store/slices/DictionariesSlice";
import { IDictionary } from "../types/Dictionary";

export const useFetchDictionaries = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setIsLoading(true));

      onSnapshot(dictionariesCollection, (querySnapshot: QuerySnapshot<DocumentData>) => {
         const dictionaries = querySnapshot.docs.map((doc) => doc.data() as IDictionary);

         dispatch(setDictionaries(dictionaries));
      });
   }, []);
};
