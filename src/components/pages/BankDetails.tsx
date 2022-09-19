import React from 'react'
import { Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from '../../app/hooks';
import { bankDetails } from '../../redux/bankSlices/BankSlice';
import { FaChevronLeft } from 'react-icons/fa';

const BankDetails = () => {

    let params = useParams();
    const navigate = useNavigate();

    const bankData = useAppSelector<any>(bankDetails);
    const accountDetails = bankData && bankData ? bankData.find((account: any) => account.id == params.id) : [];

    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <Container className='account-details'>
            <p><Button onClick={handleGoBack} variant='primary'><FaChevronLeft /> Go Back</Button></p>
            <h3 className='mb-4'>Account Full Details</h3>
            <p>
                <span className='label'>Id:</span>
                <span>{accountDetails?.id}</span>
            </p>
            <p>
                <span className='label'>Transaction Date:</span>
                <span>{accountDetails?.transactionDate}</span>
            </p>
            <p>
                <span className='label'>Category:</span>
                <span>{accountDetails?.transactionDate}</span>
            </p>
            <p>
                <span className='label'>Credit:</span>
                <span>{accountDetails?.credit}</span>
            </p>
            <p>
                <span className='label'>Debit:</span>
                <span>{accountDetails?.debit}</span>
            </p>
            <p>
                <span className='label'>Description:</span>
                <span>{accountDetails?.description}</span>
            </p>
        </Container>
    )
}

export default BankDetails