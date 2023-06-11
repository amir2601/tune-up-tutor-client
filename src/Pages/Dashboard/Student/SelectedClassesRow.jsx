import { Link } from 'react-router-dom';

const SelectedClassesRow = ({ singleClass, index, setReload }) => {

    const handleDeleteClass = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
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
                        }
                        setReload(prevReload => !prevReload);
                    })
            }
        })
    }

    const handlePaymentModal = price => {
        localStorage.setItem('price', price)
    }

    return (
        <tr>
            <td>
                {index + 1}
            </td>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={singleClass.img} />
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div className="font-bold">{singleClass.className}</div>
            </td>
            <td>
                {singleClass.name}
            </td>
            <td>{singleClass.price}</td>
            <td>
                <Link onClick={() => handleDeleteClass(singleClass._id)} className="btn btn-ghost btn-xs">Delete</Link>
            </td>
            <td>
                <Link to='/dashboard/payment' className="btn btn-ghost btn-xs" onClick={() => handlePaymentModal(singleClass.price)}>Pay</Link>
            </td>
        </tr>
    );
};

export default SelectedClassesRow;