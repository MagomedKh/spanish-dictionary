import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { ICard } from "../types/Collection";
import { db } from "./firebase";

export const getCardControler = async (id: string) => {
   const card = await getDoc(doc(db, "cards", id));
   return card.data();
};

export const updateCardControler = async ({
   cardId,
   updatedData,
}: {
   cardId: string;
   updatedData: Partial<ICard>;
}) => {
   updateDoc(doc(db, "cards", cardId), updatedData);
};
