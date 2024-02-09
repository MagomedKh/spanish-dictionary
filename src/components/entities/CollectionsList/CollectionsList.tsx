import { Flex, Typography } from "antd";
import { FC } from "react";
import { useSelector } from "react-redux";
import { selectCards, selectIsLoading } from "../../../store/slices/CollectionsSlice";
import CollectionCard from "../CollectionCard/CollectionCard";

const CollectionsList: FC = () => {
   const cards = useSelector(selectCards);
   const isLoading = useSelector(selectIsLoading);

   return (
      <Flex gap={16} wrap="wrap">
         {!isLoading ? (
            cards.length ? (
               cards.map((card) => <CollectionCard card={card} key={card.id} />)
            ) : (
               <Typography.Title type="warning">Список пуст</Typography.Title>
            )
         ) : (
            <Typography.Title type="warning">Загрузка...</Typography.Title>
         )}
      </Flex>
   );
};

export default CollectionsList;
