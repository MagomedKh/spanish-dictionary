import { ConfigProvider } from "antd";
import { FC, PropsWithChildren } from "react";

const theme = { components: { Typography: { fontSize: 18 } } };

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
   return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};

export default ThemeProvider;
