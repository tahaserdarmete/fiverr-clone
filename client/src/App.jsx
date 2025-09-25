import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./component/header";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import Search from "./pages/search";
import Create from "./pages/create";
import Detail from "./pages/detail";
import Forgot from "./pages/forgot";
import ResetPassword from "./pages/reset";
import Protected from "./component/protected";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 p-5 max-w-[1440px] mx-auto w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail/:id" element={<Detail />} />

          {/* Sadece Satıcı Hesapları erişebilecek */}
          <Route element={<Protected />}>
            <Route path="/add-gig" element={<Create />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
