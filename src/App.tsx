import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/theme";
import { GlobalStyle } from "./styles/globalStyles";
import { Outlet } from "react-router";
import { Header } from "./components/header";

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Header />
      <Outlet />
    </ThemeProvider>
  );
}
