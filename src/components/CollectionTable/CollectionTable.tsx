import { FC, useEffect, useState } from "react";
import CollectionsList from "../../components/CollectionsList";
import Collection from "../../components/Collection";
import { useLocation, useParams } from "react-router-dom";
import { Button, Flex, List, Table, TableProps, Typography } from "antd";
import { Link } from "react-router-dom";
import {
   ArrowLeftOutlined,
   DeleteOutlined,
   EditOutlined,
} from "@ant-design/icons";
// import styles from "./CollectionPage.module.scss";
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
import { IWord } from "../../models/Collection";
import { useDispatch } from "react-redux";
import { addWord, deleteCard, deleteWord } from "../../store/saga/cardsSaga";
import { useSelector } from "react-redux";
import { selectCurrentCard } from "../../store/slices/CollectionsSlice";

const CollectionTable: FC = () => {
   const dispatch = useDispatch();

   const [editingId, setEditingId] = useState<string>();
   const currentCard = useSelector(selectCurrentCard);

   const params = useParams() as { id: string };
   const { id } = params;

   if (!currentCard) {
      return <p>loading</p>;
   }

   const columns: TableProps<IWord>["columns"] = [
      {
         title: "Learn",
         dataIndex: "learnWord",
         key: "learnWord",
         width: "300px",
         render: (learnWord: IWord["learnWord"] | undefined, data) => (
            <Paragraph editable={{ editing: !learnWord }}>
               {learnWord}
            </Paragraph>
         ),
      },
      {
         title: "En",
         dataIndex: "translate",
         key: "learnWord",
         render: (translate: IWord["translate"] | undefined, word) => (
            <Paragraph editable={editingId === word.id}>
               {/* {translate.en} */}
            </Paragraph>
         ),
      },
      {
         title: "Ru",
         dataIndex: "translate",
         key: "learnWord",
         render: (translate: IWord["translate"], word) => (
            <Paragraph editable={editingId === word.id}>
               {/* {translate.ru} */}
            </Paragraph>
         ),
      },
      {
         title: "",
         dataIndex: "actions",
         key: "actions",
         render: (_, word) => (
            <ButtonGroup>
               <Button onClick={handleEditOn}>
                  <EditOutlined />
               </Button>
               <Button onClick={() => handleDelete(word.id)}>
                  <DeleteOutlined />
               </Button>
            </ButtonGroup>
         ),
         align: "right",
         width: 1,
      },
   ];

   const handleCreateWord = async () => {
      dispatch(addWord(id));
   };

   const handleEditOn = () => {};

   const handleDelete = (wordId: string) => {
      const words = currentCard.words.filter((word) => word.id !== wordId);

      dispatch(deleteWord({ cardId: id, words }));
   };

   return (
      <Table
         dataSource={currentCard?.words}
         // bordered
         columns={columns}
         footer={() => (
            <Button onClick={handleCreateWord} type="primary">
               Добавить новое слово
            </Button>
         )}
         rowKey="id"
         // onRow={
         //  (record, rowIndex) => ({
         //    onMouseOver: () =>
         //  })
         // }
      />
   );
};

export default CollectionTable;
