import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { PostPage } from "./pages/post/PostPage";
import { Blog } from "./pages/Blog";
import GlobalContextProvider from "./contexts/GlobalContext";
import { Login } from "./pages/auth/Login";
import { Page } from "./pages/Page";
import { ModalContextProvider, ThemeContextProvider } from 'avilalab-elements';

function App() {
    return (
        <BrowserRouter basename="/">
            <GlobalContextProvider>
                <ThemeContextProvider>
                    <ModalContextProvider>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/posts/:slug" element={<PostPage />} />

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
    );
}

export default App;
