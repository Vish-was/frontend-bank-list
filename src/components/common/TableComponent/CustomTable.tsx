import React from "react";
import { Table } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface CustomTableProps {
    head: any,
    data: any,
    onViewDetailsClick: any,
    onSort: any,
    sortCol: string,
    sortType: string,
}

const CustomTable = ({ head, data, onViewDetailsClick, onSort, sortCol, sortType }: CustomTableProps) => {

    return (
        <>

            {head || data ?
                <Table data-testid="custom-table" bordered hover striped className="mb-4 custom-table">
                    {head ?
                        <thead>
                            <tr>
                                {
                                    Object.entries(head).map((data: any, index: number) => {
                                        return <th onClick={() => onSort(data[0], index)} key={index}> {data[1]}
                                            {sortCol !== 'id' && data.includes(sortCol) && (sortType === 'asc' ? <FaChevronDown title={sortType} /> : <FaChevronUp title={sortType} />)}
                                        </th>
                                    })
                                }
                            </tr>
                        </thead>
                        : ''
                    }
                    {data && data.length > 0 ?
                        <tbody>
                            {
                                data.map((item: any, index: number) => {
                                    return <tr key={index}>
                                        {
                                            (typeof item === "object") ?
                                                Object.values(item).map((value: any, idx) => {
                                                    if (Object.values(head)[idx] === 'Actions') {
                                                        return <td key={idx}>
                                                            <div className="action-cell text-center">
                                                                <button onClick={() => onViewDetailsClick(item.id)} className="w-auto btn btn-sm btn-outline-primary">View Details</button>
                                                            </div>
                                                        </td>
                                                    } else {
                                                        return <td key={idx}> {value}</td>
                                                    }
                                                })
                                                :
                                                <td> {item} </td>
                                        }
                                    </tr>
                                })
                            }
                        </tbody>
                        : <tbody><tr><td colSpan={9}>Empty</td></tr></tbody>
                    }
                </Table>
                :
                <p>No records found.</p>
            }
        </>
    );
};

export default CustomTable;