import { Flex, Input, Typography } from "antd";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { deleteDictionary, editDictionary } from "../../../store/sagas/dictionariesSaga";
import { selectCurrentDictionary } from "../../../store/slices/DictionariesSlice";
import { DictionaryPageNavState } from "../../../types/DictionaryPageNavState";
import ActionsButtonGroup from "../ActionsButtonGroup/ActionsButtonGroup";
import styles from "./DictionaryInfo.module.scss";

const initialEditValue = { title: "", coverImage: "" };

const DictionaryInfo: FC = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation() as { state: DictionaryPageNavState | null };

   const [isEditing, setIsEditing] = useState(!!location.state?.isNew);
   const [editing, setEditing] = useState(initialEditValue);

   const currentDictionary = useSelector(selectCurrentDictionary);

   useEffect(() => {
      if (currentDictionary?.coverImage && currentDictionary?.title) {
         setEditing({
            title: currentDictionary.title,
            coverImage: currentDictionary.coverImage,
         });
      }
   }, [currentDictionary?.coverImage, currentDictionary?.title]);

   if (!currentDictionary) return <></>;

   const toggleEdit = () => {
      setIsEditing((prev) => !prev);
   };

   const handleDelete = () => {
      dispatch(deleteDictionary(currentDictionary.id));
      navigate("/dictionaries");
   };

   const handleInfoEditing = ({ value, name }: { value: string; name: string }) => {
      setEditing((prev) => ({ ...prev, [name]: value }));
   };

   const saveInfo = () => {
      if (editing.title && editing.coverImage) {
         dispatch(editDictionary({ id: currentDictionary.id, infoData: editing }));

         setIsEditing(false);
      }
   };

   return (
      <Flex justify="space-between">
         <Flex align="center" className={styles.dictionaryInfo}>
            <div className={styles.imgBlock}>
               {!isEditing ? (
                  <img
                     src={currentDictionary.coverImage}
                     className={styles.img}
                     alt="Некорректный URL"
                  />
               ) : (
                  <Flex vertical justify="center" className={styles.imgUrlInputWrapper}>
                     <Typography.Text>Сылка на изображение</Typography.Text>
                     <Input
                        value={editing?.coverImage}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                           handleInfoEditing({
                              value: e.target.value,
                              name: "coverImage",
                           })
                        }
                        className={styles.imgUrlInput}
                        size="large"
                     />
                  </Flex>
               )}
            </div>

            <Typography.Title
               className={`${styles.title} ${isEditing && styles.active}`}
               editable={{
                  onChange: (value) => handleInfoEditing({ name: "title", value }),
                  text: editing?.title,
                  editing: isEditing,

                  icon: <></>,
               }}
            >
               {editing.title || currentDictionary.title}
            </Typography.Title>
         </Flex>

         <ActionsButtonGroup
            onEditOn={toggleEdit}
            isEditing={isEditing}
            onSave={saveInfo}
            onDelete={handleDelete}
         />
      </Flex>
   );
};

export default DictionaryInfo;
