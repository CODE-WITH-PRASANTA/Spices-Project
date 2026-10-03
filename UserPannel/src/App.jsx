import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout/MainLayout";
import Cart from "./Components/Cart/Cart";
import BannerManagement from "./Components/BannerManagement/BannerManagement";
import ManageAddress from "./Components/ManageAddress/ManageAddress";
import ProfileSettings from "./Components/ProfileSettings/ProfileSettings";
import Dashboard from "./Components/Dashboard/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="addcart" element={<Cart />} />
          <Route
            path="bannermanagement"
            element={<BannerManagement />}
          />
          <Route
          path="/manageaddress"
          element={<ManageAddress/>}/>
          <Route
        path="/profile"
        element={<ProfileSettings/>}/>
        <Route 
        path="/dashboard"
        element={<Dashboard/>}/>

        </Route>
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;