import { ArrowLeftOutlined } from "@ant-design/icons";
import { FC } from "react";
import { To } from "react-router";
import Link from "../Link/Link";
import styles from "./GoBackLink.module.scss";

const GoBackLink: FC = () => {
   return (
      <Link to={-1 as To} className={styles.link}>
         <ArrowLeftOutlined className={styles.icon} />
         Вернуться назад
      </Link>
   );
};

export default GoBackLink;
