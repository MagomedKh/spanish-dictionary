import { FC, useState } from "react";

import { Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import { deleteWord, editWord } from "../../../store/sagas/wordsSaga";
import { selectCurrentDictionary } from "../../../store/slices/DictionariesSlice";
import { IWord } from "../../../types/Dictionary";
import ActionsButtonGroup from "../ActionsButtonGroup/ActionsButtonGroup";
import styles from "./DictionaryTable.module.scss";

const initialEditValue = { learnWord: "", en: "", ru: "", id: "" };

// TODO decompose editing to hook (includes editing info)
const DictionaryTable: FC = () => {
   const dispatch = useDispatch();

   const [edit, setEdit] = useState(initialEditValue);

   const currentDictionary = useSelector(selectCurrentDictionary);
   const cardId = currentDictionary?.id;

   if (!currentDictionary || !cardId) {
      return <></>;
   }

   const handleEdit = (name: string, value: string) => {
      setEdit((prev) => ({ ...prev, [name]: value }));
   };

   const handleEditOn = (id: string) => {
      setEdit({ ...initialEditValue, id });
   };

   const handleDelete = (wordId: string) => {
      dispatch(deleteWord({ cardId, wordId }));
   };

   const handleSaveEdit = () => {
      if (Object.values(edit).every((field) => field.length > 0)) {
         dispatch(
            editWord({
               cardId,
               word: {
                  id: edit.id,
                  learnWord: edit.learnWord,
                  translate: { en: edit.en, ru: edit.ru },
               },
            })
         );

         setTimeout(() => setEdit(initialEditValue), 400);
      }
   };

   // TODO decompose to hook
   const columns: ColumnsType<IWord> = [
      {
         title: "Изучаемое слово",
         dataIndex: "learnWord",
         key: "learnWord",
         width: "300px",
         render: (learnWord: IWord["learnWord"] | undefined, word) => {
            const isEditing = edit?.id === word.id;
            return (
               <Typography.Title
                  className={`${styles.cellText} ${isEditing && styles.active}`}
                  editable={{
                     editing: isEditing,
                     onChange: (value) => handleEdit("learnWord", value),
                     icon: <></>,
                  }}
                  level={4}
               >
                  {learnWord}
               </Typography.Title>
            );
         },
      },
      {
         title: "Ru",
         dataIndex: "translate",
         key: "learnWord",
         width: "300px",
         render: (translate: IWord["translate"], word) => {
            const isEditing = edit?.id === word.id;
            return (
               <Typography.Title
                  className={`${styles.cellText} ${isEditing && styles.active}`}
                  editable={{
                     editing: isEditing,
                     onChange: (value) => handleEdit("ru", value),
                     icon: <></>,
                  }}
                  level={4}
               >
                  {translate?.ru}
               </Typography.Title>
            );
         },
      },
      {
         title: "En",
         dataIndex: "translate",
         key: "learnWord",
         width: "300px",
         render: (translate: IWord["translate"], word) => {
            const isEditing = edit?.id === word.id;
            return (
               <Typography.Title
                  className={`${styles.cellText} ${isEditing && styles.active}`}
                  editable={{
                     editing: isEditing,
                     onChange: (value) => handleEdit("en", value),
                     icon: <></>,
                  }}
                  level={4}
               >
                  {translate?.en}
               </Typography.Title>
            );
         },
      },
      {
         title: "",
         dataIndex: "actions",
         key: "actions",

         align: "right",
         width: "100px",
      },
   ];

   const actionsCollumn = columns.find((col) => col.key === "actions");
   if (actionsCollumn) {
      actionsCollumn.render = (_, word) => (
         <ActionsButtonGroup
            isEditing={edit?.id === word.id}
            onSave={handleSaveEdit}
            onDelete={() => handleDelete(word.id)}
            onEditOn={() => handleEditOn(word.id)}
         />
      );
   }

   return currentDictionary?.words.length > 0 ? (
      <Table dataSource={currentDictionary.words} columns={columns} rowKey="id" bordered />
   ) : (
      <Typography.Title level={3} type="warning">
         Список слов пуст
      </Typography.Title>
   );
};

export default DictionaryTable;
