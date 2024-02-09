import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { IDictionary } from "../types/Dictionary";
import { db } from "./firebase";

export const getDictionaryControler = async (id: string) => {
   const dictionary = await getDoc(doc(db, "dictionaries", id));
   return dictionary.data();
};

export const updateDictionaryControler = async ({
   cardId,
   updatedData,
}: {
   cardId: string;
   updatedData: Partial<IDictionary>;
}) => {
   updateDoc(doc(db, "dictionaries", cardId), updatedData);
};
