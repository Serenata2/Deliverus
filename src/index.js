import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import UserContextProvider from "./components/store/UserContext";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {createTheme, ThemeProvider} from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

const theme = createTheme({
    typography: {
        fontFamily: "BMDOHYEON",
    }
})

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <UserContextProvider>
                        <App/>
                    </UserContextProvider>
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
