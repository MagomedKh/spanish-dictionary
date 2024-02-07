import { Typography } from "antd";
import { FC, PropsWithChildren, ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

interface ILink {
   children: ReactNode;
   to: string;
}

const Link: FC<ILink> = ({ children, to }) => {
   return (
      // <Typography.Link>
      <RouterLink to={to}>{children}</RouterLink>
      // </Typography.Link>
   );
};

export default Link;
