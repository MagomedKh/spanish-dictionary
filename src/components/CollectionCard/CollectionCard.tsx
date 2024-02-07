import { Card, Col, Typography } from "antd";
import { FC } from "react";
import styles from "./CollectionCard.module.css"; // Import css modules stylesheet as styles
import { useNavigate } from "react-router-dom";
import { ICard } from "../../models/Collection";

// interface ICollection {
//    cover: string;
//    title: string;
//    id: number;
// }

interface ICollectionCard {
   card: ICard;
}

const CollectionCard: FC<ICollectionCard> = ({ card }) => {
   const navigate = useNavigate();

   const handleClick = () => {
      navigate(`/collections/${card.id}`);
   };

   return (
      // <Col span={6}>
      <Card
         hoverable
         className={styles.card}
         cover={
            <img alt="example" className={styles.cover} src={card.coverImage} />
         }
         onClick={handleClick}
      >
         <Typography.Text>{card.title}</Typography.Text>
      </Card>
      // </Col>
   );
};

export default CollectionCard;
