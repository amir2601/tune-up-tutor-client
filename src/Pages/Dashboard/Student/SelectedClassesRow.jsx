import { Link } from 'react-router-dom';
import { FaTrashAlt, FaCreditCard } from 'react-icons/fa';
import { confirmDialog, toast } from '../../../lib/feedback';

const SelectedClassesRow = ({ singleClass, index, setReload, checked, onToggle }) => {

    const handleDeleteClass = id => {
        confirmDialog({
            title: 'Remove this class?',
            text: `"${singleClass.className}" will be removed from your selected classes.`,
            confirmText: 'Remove',
            cancelText: 'Keep it',
            danger: true,
        }).then((result) => {
            if (result) {
                fetch(`${import.meta.env.VITE_API_URL}select-class/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            toast({
                                type: 'success',
                                title: 'Class removed',
                                text: `"${singleClass.className}" was removed from your selection.`
                            })
                            setReload(prevReload => !prevReload);
                        }
                    })
            }
        })
    }

    return (
        <tr className='hover'>
            <td>
                <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                    checked={checked}
                    onChange={() => onToggle(singleClass._id)}
                    aria-label={`Select ${singleClass.className}`}
                />
            </td>
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