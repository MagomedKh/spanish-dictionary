import { Flex, Input, Typography } from "antd";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { deleteCard, editCard } from "../../../store/sagas/cardsSaga";
import { selectCurrentCard } from "../../../store/slices/CollectionsSlice";
import { CollectionPageNavState } from "../../../types/CollectionPageNavState";
import ActionsButtonGroup from "../ActionsButtonGroup/ActionsButtonGroup";
import styles from "./CollectionInfo.module.scss";

const initialEditValue = { title: "", coverImage: "" };

const CollectionInfo: FC = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation() as { state: CollectionPageNavState | null };

   const [isEditing, setIsEditing] = useState(!!location.state?.isNew);
   const [editing, setEditing] = useState(initialEditValue);

   const currentCard = useSelector(selectCurrentCard);

   useEffect(() => {
      if (currentCard?.coverImage && currentCard?.title) {
         setEditing({
            title: currentCard.title,
            coverImage: currentCard.coverImage,
         });
      }
   }, [currentCard?.coverImage, currentCard?.title]);

   if (!currentCard) return <></>;

   const toggleEdit = () => {
      setIsEditing((prev) => !prev);
   };

   const handleDelete = () => {
      dispatch(deleteCard(currentCard.id));
      navigate("/collections");
   };

   const handleInfoEditing = ({ value, name }: { value: string; name: string }) => {
      setEditing((prev) => ({ ...prev, [name]: value }));
   };

   const saveInfo = () => {
      if (editing.title && editing.coverImage) {
         dispatch(editCard({ id: currentCard.id, infoData: editing }));

         setIsEditing(false);
      }
   };

   return (
      <Flex justify="space-between">
         <Flex align="center" className={styles.collectionInfo}>
            <div className={styles.imgBlock}>
               {!isEditing ? (
                  <img src={currentCard.coverImage} className={styles.img} alt="Некорректный URL" />
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
               {editing.title || currentCard.title}
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

export default CollectionInfo;
