import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { PostPage } from "./pages/post/PostPage";
import { Blog } from "./pages/Blog";
import GlobalContextProvider from "./contexts/GlobalContext";
import { Login } from "./pages/auth/Login";
import { Page } from "./pages/Page";
import { ModalContextProvider, ThemeContextProvider } from '@avilalab/elements';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SearchPage } from "./pages/search/SearchPage";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={ queryClient }>
            <BrowserRouter basename="/">
                <GlobalContextProvider>
                    <ThemeContextProvider>
                        <ModalContextProvider>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/blog" element={<Blog />} />
                                <Route path="/posts/:slug" element={<PostPage />} />

                                <Route path="/search" element={ <SearchPage /> } />

                                <Route path="/auth/login" element={ <Login /> } />

                                <Route
                                    path="*"
                                    element={<Page />}
                                    />
                            </Routes>
                        </ModalContextProvider>
                    </ThemeContextProvider>
                </GlobalContextProvider>
            </BrowserRouter>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

export default App;
