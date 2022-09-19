import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';
import { bankDetails } from '../../redux/bankSlices/BankSlice';
import CustomTable from '../common/TableComponent/CustomTable';
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BankListingPage = () => {

    const bankData = useAppSelector<any>(bankDetails);
    let navigate = useNavigate();
    const tableHead = {
        transactionDate: 'Transation Date',
        description: 'Description',
        category: 'Category',
        debit: 'Debit',
        credit: 'Credit',
        id: 'Actions',
    };

    const [searchKeywords, setSearchKeywords] = useState<string>('')
    const [filteredBankData, setFilteredBankData] = useState<any>([])
    const [dateRange, setDateRange] = useState<any>([])
    const [startDate, endDate] = dateRange;
    const [activePage, setActivePage] = useState<number>(1);
    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortType, setSortType] = useState<string>('');

    const handleOnSort = (col: string, index: number) => {
        if (col !== 'id') {
            let filteredData = [...filteredBankData]
            setSortColumn(col)
            const sortBy = (sortType !== 'asc' ? 'asc' : 'desc')
            setSortType(sortBy)

            if (sortBy === 'desc') {
                filteredData.sort((a, b) => (a[col].toLowerCase() < b[col].toLowerCase()) ? 1 : (a[col].toLowerCase() > b[col].toLowerCase()) ? -1 : 0);
            } else {
                filteredData.sort((a, b) => (a[col].toLowerCase() < b[col].toLowerCase()) ? -1 : (a[col].toLowerCase() > b[col].toLowerCase()) ? 1 : 0);
            }

            setFilteredBankData(filteredData) // Set updated table data
        }
    }

    const handleViewDetails = (id: string) => {
        navigate(`/bank-details/${id}`); // Navigate to details page with id
    }

    useEffect(() => {
        const bankAccounts = bankData ? bankData : [];

        const bankDetailsFilter = (bankAccounts: any) => {
            const text = searchKeywords;
            let filteredData = [...bankAccounts]

            // Apply Search Keyword
            if (text !== '') {
                filteredData = filteredData.filter((account: any) => JSON.stringify(account).toLowerCase().includes(text.toLowerCase()))
            }

            // Apply Range Filter
            if (dateRange.length === 2 && dateRange[1] !== null) {
                filteredData = filteredData.filter((account: any) => (new Date(dateRange[0]) < new Date(account.transactionDate)) && (new Date(account.transactionDate) < new Date(dateRange[1])))
            }

            setFilteredBankData(filteredData) // Set updated table data
            setActivePage(1) // Reset Pagination
        }

        bankDetailsFilter(bankAccounts); // Call 
    }, [bankData, dateRange, searchKeywords])

    const handlePageChange = (pageNumber: number) => {
        setActivePage(pageNumber);
    }

    return (
        <Container className='my-5'>
            <h3 className='mb-4'>Bank Listing</h3>

            <div className="filter-options">
                <div className="row">
                    <div className="col">
                        <label>Transation Date Range</label>
                        <DatePicker
                            className='form-control'
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            minDate={new Date('2015-12-31')}
                            maxDate={new Date('2016-12-30')}
                            onChange={(update) => {
                                setDateRange(update);
                            }}
                            placeholderText="Start From 2015-12-31 To 2016-12-30"
                            isClearable={true}
                        />
                    </div>
                    <div className="col">
                        <label>Search</label>
                        <input
                            type="text"
                            name="search-data"
                            className='form-control mb-3'
                            onChange={(e) => setSearchKeywords(e.target.value)}
                            placeholder='Search by keywords...'
                        />
                    </div>
                </div>
            </div>
            <CustomTable
                head={tableHead}
                data={filteredBankData.slice(((activePage - 1) * 10), activePage * 10)}
                onViewDetailsClick={handleViewDetails}
                onSort={handleOnSort}
                sortCol={sortColumn}
                sortType={sortType}
            />

            <Pagination
                activePage={activePage}
                itemsCountPerPage={10}
                totalItemsCount={filteredBankData.length}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                itemClass={'page-item'}
                linkClass={'page-link'}
            />
        </Container>
    )
}

export default BankListingPage