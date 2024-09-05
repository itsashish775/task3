import logo from './logo.svg';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import './App.css';
import { lazy, Suspense } from 'react';
import EditCustomer from './components/EditCustomer';

const CustomerList = lazy(() => import("./components/CustomerList"))
const AddCustomer = lazy(() => import("./components/AddCustomer"))

function App() {
  return (
    <div className="App">

      <BrowserRouter basename="/">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<CustomerList />} />
            <Route path="/addCustomer" element={<AddCustomer />} />
            <Route path="/editCustomer/:id" element={<EditCustomer />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
