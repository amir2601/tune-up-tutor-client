import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import useTitle from '../../../Hooks/useTitle';
import moment from 'moment';
import { FaReceipt } from 'react-icons/fa';
import { Reveal } from '../../../components/Shared/Animations/Reveal';
import SectionHeader from '../../../components/Shared/Dashboard/SectionHeader';
import TableSkeleton from '../../../components/Shared/Dashboard/TableSkeleton';
import EmptyState from '../../../components/Shared/Dashboard/EmptyState';

const PaymentHistory = () => {
    useTitle('Payments History');
    const { user } = useContext(AuthContext);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}payment-history/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                const formattedData = data.map(info => ({
                    ...info,
                    date: moment(info.date).format('DD MMMM YYYY'),
                }));
                setHistory(formattedData);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className='mx-auto w-full max-w-7xl space-y-6'>
            <SectionHeader title='My Payments History' subtitle='A record of every class payment you have made.' />

            {loading ? (
                <TableSkeleton rows={4} cols={4} />
            ) : (
                <Reveal className='surface overflow-hidden bg-base-100'>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr className='text-xs uppercase tracking-wider text-base-content/50'>
                                    <th className='w-14'>#</th>
                                    <th>Class Name</th>
                                    <th>Transaction Id</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((info, index) => (
                                    <tr key={info._id || index} className='hover'>
                                        <th className='font-semibold text-base-content/50'>{index + 1}</th>
                                        <td>
                                            <span className='flex items-center gap-2 font-semibold'>
                                                <FaReceipt className='text-primary' /> {info.name}
                                            </span>
                                        </td>
                                        <td><code className='rounded bg-base-200 px-2 py-1 text-xs'>{info.transactionId}</code></td>
                                        <td className='text-base-content/70'>{info.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {history.length === 0 && (
                        <EmptyState
                            icon='🧾'
                            title='No payment history yet'
                            text='Your completed transactions will be listed here for easy reference.'
                        />
                    )}
                </Reveal>
            )}
        </div>
    );
};

export default PaymentHistory;
