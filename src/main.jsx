import './assets/layers.css';
import './assets/custom-style.css';

import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import 'primeicons/primeicons.css';
// import 'bootstrap/dist/css/bootstrap-reboot.min.css';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'primereact/resources/themes/lara-light-blue/theme.css';
// // import "primereact/resources/themes/lara-light-cyan/theme.css"; 
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';

import Layout from "./components/Layout.jsx";
import UserRegister from "./components/User/UserRegister.jsx";
import UserLogin from "./components/User/UserLogin.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import UserProfile from "./components/User/UserProfile.jsx";
import UserLogout from "./components/User/UserLogout.jsx";
import ContactCreate from "./components/Contact/ContactCreate.jsx";
import ContactList from "./components/Contact/ContactList.jsx";
import ContactEdit from "./components/Contact/ContactEdit.jsx";
import ContactDetail from "./components/Contact/ContactDetail.jsx";
import AddressCreate from "./components/Address/AddressCreate.jsx";
import AddressEdit from "./components/Address/AddressEdit.jsx";
import ProdukList from './components/Produk/ProdukList.jsx';
import ProdukForm from './components/Produk/ProdukForm.jsx';
import Bootstrap_PT from './util/passthrough.js';
import JualList from './components/Jual/JualList.jsx';
import JualForm from './components/Jual/JualForm.jsx';
import ProdukCatalog from './components/Produk/ProdukCatalog.jsx';
import ProdukDetilSelected from './components/Produk/ProdukDetilSelected.jsx';
import KeranjangForm from './components/Keranjang/KeranjangForm.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <PrimeReactProvider value={{ unstyled: false, pt: Bootstrap_PT, cssLayer: true }}>

    <PrimeReactProvider value={{ unstyled: false, pt: '', cssLayer: true }}>
    <BrowserRouter>
      <Routes>
        {/* <Route element={<Layout/>}> */}
        <Route element={<DashboardLayout/>}>
          <Route index element={<ProdukCatalog/>}/>
          <Route path="/register" element={<UserRegister/>}/>
          <Route path="/login" element={<UserLogin/>}/>
          <Route path="/logout" element={<UserLogout/>}/>
        </Route>
        
        {/* <Route path="/dashboard" element={<DashboardLayout/>}> */}
        <Route element={<DashboardLayout/>}>

          <Route path="users">
            <Route path="profile" element={<UserProfile/>}/>
            <Route path="logout" element={<UserLogout/>}/>
          </Route>

          <Route path="contacts">
            <Route index element={<ContactList/>}/>
            <Route path="create" element={<ContactCreate/>}/>
            <Route path=":id">
              <Route index element={<ContactDetail/>}/>
              <Route path="edit" element={<ContactEdit/>}/>
              <Route path="addresses">
                <Route path="create" element={<AddressCreate/>}/>
                <Route path=":addressId/edit" element={<AddressEdit/>}/>
              </Route>
            </Route>
          </Route>

          <Route path="produk">
            <Route index element={<ProdukList/>}/>
            <Route path="create" element={<ProdukForm/>}/>
            <Route path=":id">
              <Route index element={<ContactDetail/>}/>
              <Route path="edit" element={<ProdukForm/>}/>
              <Route path="detil-selected" element={<ProdukDetilSelected/>}/>
            </Route>
            <Route path="catalog" element={<ProdukCatalog/>}/>
          </Route>
          <Route path="jual">
            <Route index element={<JualList/>}/>
            <Route path="create" element={<JualForm/>}/>
            <Route path=":id">
              {/* <Route index element={<ContactDetail/>}/> */}
              <Route path="edit" element={<JualForm/>}/>
            </Route>
          </Route>
          <Route path="keranjang">
            <Route path="form" element={<KeranjangForm/>}/>
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
    </PrimeReactProvider>
  // </StrictMode>,
)
