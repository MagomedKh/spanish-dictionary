import { Flex, Typography } from "antd";
import { FC } from "react";
import AddCardBtn from "../../components/entities/AddCardBtn/AddCardBtn";
import CollectionsList from "../../components/entities/CollectionsList/CollectionsList";
import Page from "../../components/ui/Page/Page";
import styles from "./CollectionsListPage.module.scss";

const CollectionsListPage: FC = () => {
   return (
      <Page>
         <Flex justify="space-between" align="center">
            <Typography.Title className={styles.title}>Словари</Typography.Title>

            <AddCardBtn />
         </Flex>

         <CollectionsList />
      </Page>
   );
};

export default CollectionsListPage;
