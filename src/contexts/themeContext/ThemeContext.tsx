import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material";
import React from "react";

const MUTheme = createTheme({
    typography: { button: { textTransform: "none" } },
    palette: { primary: { main: "#1e88e5" }, mode: "light" },
});

export function AppThemeProvider({
    children,
}: {
    children?: React.ReactNode;
}): React.ReactElement {
    return <MUIThemeProvider theme={MUTheme}>{children}</MUIThemeProvider>;
}
