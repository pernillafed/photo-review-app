import { Route, Routes } from "react-router-dom"
import RequireAuth from "./components/RequireAuth"
import Navigation from "./components/Navigation"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ReviewPhotos from "./pages/ReviewPhotos"
import ThankYouPage from "./pages/ThankYouPage"
import MyAlbums from "./pages/MyAlbums"
import MyAlbum from "./pages/MyAlbum"
import LogoutPage from "./pages/LogoutPage"
import PageNotFound from "./pages/PageNotFound"
import Footer from "./components/Footer"

const App = () => {
    return (
        <div className="App">

            <Navigation />

            <Routes>

                {/* Guest routes */}
                <Route path="/" element={ <HomePage /> } />
                <Route path="/login" element={ <LoginPage /> } />
                <Route path="/signup" element={ <SignupPage /> } />
                <Route path="/review-photos/album/:albumId" element={ <ReviewPhotos /> } />
                <Route path="/thank-you" element={ <ThankYouPage /> } />

                {/* Protected routes */}
                <Route path="/my-albums" element={ <RequireAuth redirectTo="/login"> <MyAlbums /> </RequireAuth> } />
                <Route path="/my-albums/album/:albumId" element={ <RequireAuth redirectTo="/login"> <MyAlbum /> </RequireAuth> } />
                <Route path="/logout" element={ <RequireAuth redirectTo="/login"> <LogoutPage /> </RequireAuth> } />

                <Route path="*" element={<PageNotFound />} />

            </Routes>

            <Footer />

        </div>
    )
}

export default App
