

const EnrolledClassCard = ({ singleClass, index }) => {

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
                {singleClass.instructorName}
            </td>
            <td>{singleClass.price}</td>
        </tr>
    );
};

export default EnrolledClassCard;