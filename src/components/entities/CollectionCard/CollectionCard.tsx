import { Card, Typography } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ICard } from "../../../types/Collection";
import styles from "./CollectionCard.module.scss";

interface ICollectionCard {
   card: ICard;
}

const CollectionCard: FC<ICollectionCard> = ({ card }) => {
   const navigate = useNavigate();

   const handleClick = () => {
      navigate(`/collections/${card.id}`);
   };

   return (
      <Card
         hoverable
         className={styles.card}
         cover={<img alt="Некорректный URL" className={styles.cover} src={card.coverImage} />}
         onClick={handleClick}
      >
         <Typography.Text>{card.title}</Typography.Text>
      </Card>
   );
};

export default CollectionCard;
