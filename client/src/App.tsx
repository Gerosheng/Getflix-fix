import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './components/Homepage/HomePage'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Login from './components/Navbar/Login'
import PasswordPage from './components/PasswordPage/Password'
import ContactForm from './components/Contact/ContactForm'
import './App.css'
import Signup from './components/Navbar/Signup'
import ProfilePage from './components/Profile/Profile'
import Movies from './components/MoviesSeries/Movies'
import Series from './components/MoviesSeries/Series'
import Welcome from './components/WelcomePage/Welcome'
import { AuthProvider, RequireAuth } from './contexts/authContext'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/layout/*" element={<Layout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

const Layout = () => {
  const location = useLocation();
  const showNavbar = !["/", "/login", "/signup", "/password-recovery"].includes(location.pathname);

  return (
    <Routes>
      {showNavbar && (
        <Route
          path="/"
          element={
            <RequireAuth>
              <Navbar />
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/Profile" element={<ProfilePage />} />
              <Route path="/Contact" element={<ContactForm />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/series" element={<Series />} />
            </RequireAuth>
          }
        />
      )}
      {!showNavbar && (
        <>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/password-recovery" element={<PasswordPage />} />
        </>
      )}
    </Routes>
  );
};


export default App