import { Typography } from "antd";
import { FC, ReactNode } from "react";
import styles from "./Page.module.scss";

interface IPage {
   isLoading?: boolean;
   children: ReactNode;
}

const Page: FC<IPage> = ({ children, isLoading }) => {
   if (isLoading) {
      return (
         <Page>
            <Typography.Title type="warning">Загрузка...</Typography.Title>
         </Page>
      );
   }

   return <div className={styles.page}>{children}</div>;
};

export default Page;
