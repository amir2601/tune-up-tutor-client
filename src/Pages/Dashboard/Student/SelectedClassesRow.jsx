import { Link } from 'react-router-dom';
import { FaTrashAlt, FaCreditCard } from 'react-icons/fa';
import Swal from 'sweetalert2';

const SelectedClassesRow = ({ singleClass, index, setReload }) => {

    const handleDeleteClass = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#7c3aed',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_API_URL}select-class/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            setReload(prevReload => !prevReload);
                        }
                    })
            }
        })
    }

    return (
        <tr className='hover'>
            <td className='font-semibold text-base-content/50'>
                {index + 1}
            </td>
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12 ring-2 ring-base-300">
                        <img src={singleClass.img} alt={singleClass.className} />
                    </div>
                </div>
            </td>
            <td>
                <div className="font-bold capitalize">{singleClass.className}</div>
            </td>
            <td className='text-base-content/70'>
                {singleClass.name}
            </td>
            <td>
                <span className='badge badge-primary badge-outline font-semibold'>${singleClass.price}</span>
            </td>
            <td>
                <button onClick={() => handleDeleteClass(singleClass._id)} className="btn btn-ghost btn-xs gap-1 text-error hover:bg-error/10">
                    <FaTrashAlt /> Delete
                </button>
            </td>
            <td>
                <Link to={`/dashboard/payment/${singleClass._id}`} className="btn btn-primary btn-xs gap-1 rounded-full">
                    <FaCreditCard /> Pay
                </Link>
            </td>
        </tr>
    );
};

export default SelectedClassesRow;
