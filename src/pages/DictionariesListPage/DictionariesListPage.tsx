import { Flex, Typography } from "antd";
import { FC } from "react";
import AddDictionaryBtn from "../../components/entities/AddDictionaryBtn/AddDictionaryBtn";
import DictionariesList from "../../components/entities/DictionariesList/DictionariesList";
import Page from "../../components/ui/Page/Page";
import styles from "./DictionariesListPage.module.scss";

const DictionariesListPage: FC = () => {
   return (
      <Page>
         <Flex justify="space-between" align="center">
            <Typography.Title className={styles.title}>Словари</Typography.Title>

            <AddDictionaryBtn />
         </Flex>

         <DictionariesList />
      </Page>
   );
};

export default DictionariesListPage;
