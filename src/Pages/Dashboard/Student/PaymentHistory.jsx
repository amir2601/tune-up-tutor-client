import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import useTitle from '../../../Hooks/useTitle';

const PaymentHistory = () => {
    useTitle('Payments History')
    const { user } = useContext(AuthContext)
    const [history, setHistory] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}payment-history/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setHistory(data);
            })
    }, [])

    return (
        <div className="overflow-x-auto">
            <div className='text-center'>
                <h2 className='text-3xl font-semibold my-4'>My Payments History</h2>
            </div>
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Class Name</th>
                        <th>Transaction Id</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map((info, index) =>
                            <tr>
                                <th>{index + 1}</th>
                                <td>{info.name}</td>
                                <td>{info.transactionId}</td>
                                <td>{info.date}</td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;