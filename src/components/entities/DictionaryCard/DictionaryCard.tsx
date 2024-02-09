import { Card, Typography } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { IDictionary } from "../../../types/Dictionary";
import styles from "./DictionaryCard.module.scss";

interface IDictionaryCard {
   dictionary: IDictionary;
}

const DictionaryCard: FC<IDictionaryCard> = ({ dictionary }) => {
   const navigate = useNavigate();

   const handleClick = () => {
      navigate(`/dictionaries/${dictionary.id}`);
   };

   return (
      <Card
         hoverable
         className={styles.dictionary}
         cover={<img alt="Некорректный URL" className={styles.cover} src={dictionary.coverImage} />}
         onClick={handleClick}
      >
         <Typography.Text>{dictionary.title}</Typography.Text>
      </Card>
   );
};

export default DictionaryCard;
