import { Button } from "antd";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createDictionary } from "../../../store/sagas/dictionariesSaga";
import { openDictionary, selectDictionaries } from "../../../store/slices/DictionariesSlice";
import { DictionaryPageNavState } from "../../../types/DictionaryPageNavState";
import { getNextObjId } from "../../../utils/getNextObjId";
import styles from "./AddDictionaryBtn.module.scss";

const AddDictionaryBtn: FC = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const dictionaries = useSelector(selectDictionaries);

   const handleCreateDictionary = () => {
      const id = getNextObjId(dictionaries);
      const dictionary = {
         title: `Новый набор ${parseInt(id) + 1}`,
         coverImage: "https://placehold.co/600x400/png",
         configs: "conf",
         words: [],
         id,
      };

      dispatch(openDictionary(dictionary));
      dispatch(createDictionary(dictionary));

      navigate(`/dictionaries/${id}`, {
         state: { isNew: true } as DictionaryPageNavState,
      });
   };

   return (
      <Button onClick={handleCreateDictionary} className={styles.addBtn} type="primary">
         Создать новый словарь
      </Button>
   );
};

export default AddDictionaryBtn;
