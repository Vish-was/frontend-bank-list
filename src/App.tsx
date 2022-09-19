import React, { useEffect } from 'react'
import { useAppDispatch } from './app/hooks';
import { setBankDetails } from './redux/bankSlices/BankSlice';
import BankListingPage from './components/pages/BankListingPage';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import BankDetails from './components/pages/BankDetails';

function App() {

  const dispatch = useAppDispatch();


  useEffect(() => {
    const fetchBankDetails = () => {
      fetch('http://localhost:5000/accounts')
        .then(response => response.json())
        .then(data => dispatch(setBankDetails(data)))
        .catch(() => {
          alert("Please start the server first.")
        });
    }
    fetchBankDetails() // Call
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BankListingPage />} />
        <Route path="/bank-details/:id" element={<BankDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
