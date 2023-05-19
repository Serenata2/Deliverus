import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import UserContextProvider from "./components/store/UserContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <UserContextProvider>
                    <App/>
                </UserContextProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
);
