import { Flex, Typography } from "antd";
import { FC } from "react";
import { useSelector } from "react-redux";
import { selectDictionaries, selectIsLoading } from "../../../store/slices/DictionariesSlice";
import DictionaryCard from "../DictionaryCard/DictionaryCard";

const DictionariesList: FC = () => {
   const dictionaries = useSelector(selectDictionaries);
   const isLoading = useSelector(selectIsLoading);

   return (
      <Flex gap={16} wrap="wrap">
         {!isLoading ? (
            dictionaries.length ? (
               dictionaries.map((dictionary) => (
                  <DictionaryCard dictionary={dictionary} key={dictionary.id} />
               ))
            ) : (
               <Typography.Title type="warning">Список пуст</Typography.Title>
            )
         ) : (
            <Typography.Title type="warning">Загрузка...</Typography.Title>
         )}
      </Flex>
   );
};

export default DictionariesList;
