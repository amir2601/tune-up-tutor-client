import React, { useContext, useEffect, useState } from 'react';
import SelectedClassesRow from './SelectedClassesRow';
import { AuthContext } from '../../../Provider/AuthProvider';
import useTitle from '../../../Hooks/useTitle';
import { Reveal } from '../../../components/Shared/Animations/Reveal';
import SectionHeader from '../../../components/Shared/Dashboard/SectionHeader';
import TableSkeleton from '../../../components/Shared/Dashboard/TableSkeleton';
import EmptyState from '../../../components/Shared/Dashboard/EmptyState';
import { confirmDialog, toast } from '../../../lib/feedback';
import { FaTrashAlt } from 'react-icons/fa';

const SelectedClasses = () => {
    useTitle('Selected Classes');
    const { user } = useContext(AuthContext);
    const [classes, setClasses] = useState([]);
    const [reload, setReload] = useState(true);
    const [loading, setLoading] = useState(true);
    const [checked, setChecked] = useState([]);
    const [working, setWorking] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}select-class/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setClasses(data);
                setChecked([]);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [reload]);

    const allChecked = classes.length > 0 && checked.length === classes.length;

    const toggleAll = () => {
        setChecked(allChecked ? [] : classes.map(c => c._id));
    };

    const toggleOne = (id) => {
        setChecked(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleDelete = (ids) => {
        if (!ids.length) return;
        const count = ids.length;
        confirmDialog({
            title: count === classes.length ? 'Delete all selected classes?' : `Delete ${count} selected class${count > 1 ? 'es' : ''}?`,
            text: 'This removes them from your selection. You can always select them again later.',
            confirmText: 'Delete',
            cancelText: 'Cancel',
            danger: true,
        }).then(async (result) => {
            if (!result) return;
            setWorking(true);
            try {
                const outcomes = await Promise.all(
                    ids.map(id =>
                        fetch(`${import.meta.env.VITE_API_URL}select-class/${id}`, { method: 'DELETE' })
                            .then(res => res.json())
                    )
                );
                const removed = outcomes.filter(o => o.deletedCount > 0).length;
                if (removed > 0) {
                    toast({
                        type: 'success',
                        title: removed === count ? 'Classes removed' : 'Some classes removed',
                        text: removed === count
                            ? `${count} class${count > 1 ? 'es' : ''} removed from your selection.`
                            : `${removed} of ${count} selected class${count > 1 ? 'es' : ''} were removed.`,
                    });
                    setReload(prev => !prev);
                }
            } catch (error) {
                console.log(error);
                toast({
                    type: 'error',
                    title: 'Something went wrong',
                    text: 'Could not remove the selected classes. Please try again.',
                });
            } finally {
                setWorking(false);
            }
        });
    };

    const deleteAll = () => {
        if (!classes.length) return;
        setChecked(classes.map(c => c._id));
        handleDelete(classes.map(c => c._id));
    };

    return (
        <div className='mx-auto w-full max-w-7xl space-y-6'>
            <SectionHeader
                title='My Selected Classes'
                subtitle='Tick the boxes to remove several at once, or pay for a class to enrol.'
                action={!loading && classes.length > 0 && (
                    <span className='badge badge-primary badge-outline rounded-full px-3 py-3 font-semibold'>{classes.length} selected</span>
                )}
            />

            {loading ? (
                <TableSkeleton rows={4} cols={7} />
            ) : (
                <Reveal className='surface overflow-hidden bg-base-100' direction='up'>
                    {/* Bulk actions */}
                    <div className="flex flex-wrap items-center gap-2 border-b border-base-300/60 px-4 py-3">
                        <label className="flex cursor-pointer select-none items-center gap-2 text-sm font-semibold">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-primary checkbox-sm"
                                checked={allChecked}
                                onChange={toggleAll}
                                aria-label="Select all classes"
                            />
                            Select all
                        </label>
                        <div className="mx-2 h-5 w-px bg-base-300" />
                        <button
                            type="button"
                            onClick={() => handleDelete(checked)}
                            disabled={!checked.length || working}
                            className="btn btn-error btn-sm rounded-full px-4 text-white disabled:bg-base-300 disabled:text-base-content/40"
                        >
                            <FaTrashAlt className="text-xs" />
                            Delete selected {checked.length > 0 && `(${checked.length})`}
                        </button>
                        <button
                            type="button"
                            onClick={deleteAll}
                            disabled={!classes.length || working}
                            className="btn btn-outline btn-error btn-sm rounded-full disabled:border-base-300 disabled:text-base-content/40"
                        >
                            Delete all
                        </button>
                        {working && <span className="loading loading-spinner loading-sm text-primary" />}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr className='text-xs uppercase tracking-wider text-base-content/50'>
                                    <th className='w-8'></th>
                                    <th className='w-14'>#</th>
                                    <th>Image</th>
                                    <th>Class Name</th>
                                    <th>Instructor Name</th>
                                    <th>Price</th>
                                    <th>Delete</th>
                                    <th>Pay</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classes.map((singleClass, index) => (
                                    <SelectedClassesRow
                                        key={singleClass._id}
                                        index={index}
                                        singleClass={singleClass}
                                        setReload={setReload}
                                        checked={checked.includes(singleClass._id)}
                                        onToggle={toggleOne}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {classes.length === 0 && (
                        <EmptyState
                            icon='🎟️'
                            title='No classes selected yet'
                            text='Browse the catalog and pick a class that excites you — it will show up right here.'
                        />
                    )}
                </Reveal>
            )}
        </div>
    );
};

export default SelectedClasses;