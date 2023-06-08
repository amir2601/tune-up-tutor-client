import React, { useContext, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const ClassesCard = ({ singleClass }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [selected, setSelected] = useState(false);
    const userRole = localStorage.getItem('user-role');

    const handleSelectClass = (selClass) => {
        const selectClass = { ...selClass, studentEmail: user?.email }
        console.log(selectClass);
        if (!user) {
            return navigate('/login')
        }
        fetch(`${import.meta.env.VITE_API_URL}select-class`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(selectClass)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    setSelected(true)
                }
            })
    }

    return (
        <div>
            <div className={singleClass.students === 0 ? 'card card-compact w-full bg-red-500 text-white shadow-xl' : 'card card-compact w-full bg-base-100 shadow-xl'}>
                <figure><img src={singleClass.img} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{singleClass.className}</h2>
                    <h2 className="text-lg"><span className='font-semibold'>Instructor Name:</span> {singleClass.name}</h2>
                    <p><span className='font-semibold'>Instructor Email:</span> {singleClass.email}</p>
                    <div className="card-actions justify-start">
                        <div className="badge badge-outline">$ {singleClass.price}</div>
                        <div className="badge badge-outline items-center gap-1 text-yellow-500"><FaStar></FaStar> {singleClass.rating}</div>
                    </div>
                    <div className="card-actions justify-end">
                        {/* <Link to={!user && '/login'}>
                            <button onClick={() => handleSelectClass(singleClass)} disabled={singleClass.students === 0 || selected === true ? true : false} className="btn btn-neutral btn-outline btn-sm">Select Class</button>
                        </Link> */}
                        <button onClick={() => handleSelectClass(singleClass)} disabled={singleClass.students === 0 || selected === true || userRole === 'admin' || userRole === 'instructor' ? true : false} className="btn btn-neutral btn-outline btn-sm">Select Class</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassesCard;