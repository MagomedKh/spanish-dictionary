import { FC, useDeferredValue, useEffect, useState } from "react";
import CollectionsList from "../../components/CollectionsList";
import Collection from "../../components/Collection";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Flex, List, Table, TableProps, Typography } from "antd";
import { Link } from "react-router-dom";
import {
   ArrowLeftOutlined,
   DeleteOutlined,
   EditOutlined,
} from "@ant-design/icons";
import styles from "./CollectionPage.module.scss";
import ButtonGroup from "antd/es/button/button-group";
import Paragraph from "antd/es/typography/Paragraph";
import {
   collection,
   addDoc,
   getDocs,
   query,
   onSnapshot,
} from "firebase/firestore";
import { db } from "../../store/firebase";
import CollectionTable from "../../components/CollectionTable/CollectionTable";
import { ICard, IWord } from "../../models/Collection";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
   openCard,
   selectCards,
   selectCurrentCard,
} from "../../store/slices/CollectionsSlice";
import { deleteCard, editCard } from "../../store/saga/cardsSaga";
import { CollectionPageNavState } from "../../models/CollectionPageNavState";

const CollectionPage: FC = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation() as { state: CollectionPageNavState | null };

   const [isEditing, setIsEditing] = useState(false);
   const [editedCardTitle, setEditedCardTitle] = useState<string>();
   const deferedEditedCardTitle = useDeferredValue(editedCardTitle);

   const currentCard = useSelector(selectCurrentCard);
   const cards = useSelector(selectCards);

   const params = useParams();
   const { id } = params as { id: string };

   useEffect(() => {
      if (location.state?.isNew) {
         setIsEditing(true);
      }
   }, [location.state?.isNew]);

   useEffect(() => {
      if (id) {
         const currentCard = cards.find((card) => card.id === id);

         currentCard && dispatch(openCard(currentCard));
      }
   }, [id, cards]);

   useEffect(() => {
      if (deferedEditedCardTitle && currentCard) {
         dispatch(
            editCard({ id: currentCard.id, title: deferedEditedCardTitle })
         );
         setIsEditing(false);
      }
   }, [deferedEditedCardTitle]);

   if (id === undefined) {
      return (
         <Typography.Title type="danger">
            Не удалось найти набор слов
         </Typography.Title>
      );
   } else if (!currentCard) {
      return <p>loading</p>;
   }

   // const wordsList = collections?.find(
   //    (wordsList) => wordsList.id === parseInt(id)
   // );
   const handleEditOn = () => {
      setIsEditing(true);
   };

   const handleDelete = () => {
      dispatch(deleteCard(id));
      navigate("/collections");
   };

   const handleCardTitleEditing = (value: string) => {
      setEditedCardTitle(value);
   };

   return (
      <>
         {/* <Typography.Link > */}
         <Link to="/collections" className={styles.goBackLink}>
            <ArrowLeftOutlined className={styles.goBackIcon} />
            Вернуться назад
         </Link>
         {/* </Typography.Link> */}

         <Flex justify="space-between">
            <Flex align="center" className={styles.collectionInfo}>
               <img className={styles.img} src={currentCard.coverImage} />

               <Typography.Title
                  className={styles.title}
                  editable={{
                     onChange: handleCardTitleEditing,
                     text: editedCardTitle,
                     editing: isEditing,
                     icon: <></>,
                  }}
               >
                  {editedCardTitle || currentCard.title}
               </Typography.Title>
            </Flex>

            <ButtonGroup className={styles.buttonGroup}>
               <Button onClick={handleEditOn}>
                  <EditOutlined />
               </Button>
               <Button onClick={handleDelete}>
                  <DeleteOutlined />
               </Button>
            </ButtonGroup>
         </Flex>

         <CollectionTable />
      </>
   );
};

export default CollectionPage;
