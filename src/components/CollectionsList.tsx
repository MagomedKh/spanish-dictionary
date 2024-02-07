import { Card, Col, Flex, Row, Typography } from "antd";
import { FC } from "react";
import CollectionCard from "./CollectionCard/CollectionCard";
import { ICard } from "../models/Collection";
import { useSelector } from "react-redux";
import { selectCards } from "../store/slices/CollectionsSlice";

const CollectionsList: FC = () => {
   const cards = useSelector(selectCards);

   return (
      <>
         <Flex gap={16} wrap="wrap">
            {cards.length > 0 ? (
               cards.map((card) => <CollectionCard card={card} key={card.id} />)
            ) : (
               <Typography.Title type="warning">Список пуст</Typography.Title>
            )}
         </Flex>
      </>
   );
};

export default CollectionsList;
