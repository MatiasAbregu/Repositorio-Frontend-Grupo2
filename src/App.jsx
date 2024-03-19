import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home/Home";
import { ServiceType } from "./pages/servicesPages/ServiceType";
import { ServiceIdPage } from "./pages/servicesPages/ServiceIdPage";
import UserCreate from "./pages/user/UserCreate";
import UserLogin from "./pages/user/UserLogin";
import { HomeEmployee } from "./pages/home/HomeEmployee";
import { ReadServices } from "./pages/crudPages/ReadServices";
import { CreateUpdateService } from "./pages/crudPages/CreateUpdateService";
import { Logout } from "./pages/user/Logout";
import { ReadEmployees } from "./pages/crudPages/ReadEmployees";
import { CreateUpdateEmployee } from "./pages/crudPages/CreateUpdateEmployee";
import { ReadPackages } from "./pages/crudPages/ReadPackages";
import { CreateUpdatePackage } from "./pages/crudPages/CreateUpdatePackage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/service/hotels" element={<ServiceType type={"Hoteles"} /> } />
        <Route path="/service/car-rent" element={<ServiceType type={"Autos"} /> }  />
        <Route path="/service/bus-tickets" element={<ServiceType type={"Colectivos"} /> } />
        <Route path="/service/plane-tickets" element={<ServiceType type={"Aviones"} /> } />
        <Route path="/service/train-tickets" element={<ServiceType type={"Trenes"} /> } />
        <Route path="/service/excursion" element={<ServiceType type={"Excursiones"} /> } />
        <Route path="/service/events-tickets" element={<ServiceType type={"Eventos"} /> } />

        <Route path="/service/hotels/:id" element={<ServiceIdPage /> } />     
        <Route path="/service/car-rent/:id" element={<ServiceIdPage /> } />
        <Route path="/service/bus-tickets/:id" element={<ServiceIdPage /> } />   
        <Route path="/service/plane-tickets/:id" element={<ServiceIdPage /> } />
        <Route path="/service/train-tickets/:id" element={<ServiceIdPage /> } />
        <Route path="/service/excursion/:id" element={<ServiceIdPage /> } />     
        <Route path="/service/events-tickets/:id" element={<ServiceIdPage /> } />  

        <Route path="/user/register" element={<UserCreate />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/employee/home" element={<HomeEmployee /> } />
        <Route path="/employee/services" element={<ReadServices />} />
        <Route path="/employee/create-service" element={<CreateUpdateService />} />
        <Route path="/employee/update-service/:id" element={<CreateUpdateService />} />
        <Route path="/employee/employees" element={<ReadEmployees />} />
        <Route path="/employee/create-employee" element={<CreateUpdateEmployee />}/>
        <Route path="/employee/update-employee/:id" element={<CreateUpdateEmployee />}/>
        <Route path="/employee/packages" element={<ReadPackages />} />
        <Route path="/employee/create-package" element={<CreateUpdatePackage />} />
        <Route path="/employee/update-package/:id" element={<CreateUpdatePackage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
