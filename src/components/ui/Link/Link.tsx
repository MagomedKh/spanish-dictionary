import { Typography } from "antd";
import { FC, ReactNode } from "react";
import { To, useNavigate } from "react-router-dom";
import styles from "./Link.module.scss";

interface ILink {
   children: ReactNode;
   to: To;
   className?: string;
}

const Link: FC<ILink> = ({ children, to, className }) => {
   const navigate = useNavigate();

   const handleClick = () => {
      navigate(to);
   };

   return (
      <Typography.Link onClick={handleClick} className={`${styles.link} ${className}`}>
         {children}
      </Typography.Link>
   );
};

export default Link;
