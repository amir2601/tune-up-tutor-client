import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    FaCheckCircle,
    FaExclamationCircle,
    FaExclamationTriangle,
    FaInfoCircle,
    FaTimes,
} from 'react-icons/fa';

/**
 * Lightweight, design-matched feedback layer replacing SweetAlert2.
 *
 * - `toast({ type, title, text, action })`   -> auto-dismissing toast, bottom-right
 * - `confirmDialog({...})`                    -> Promise<boolean>
 * - `promptDialog({...})`                     -> Promise<string | null>
 * - `alertDialog({...})`                      -> Promise<void>
 *
 * Mount <FeedbackHost /> once at the app root.
 */

let listeners = [];
let uid = 0;
const toasts = [];
let dialogs = [];
let activeDialog = null;

const notify = () => listeners.forEach(listener => listener());

const ICONS = {
    success: <FaCheckCircle className="text-xl text-success" />,
    error: <FaExclamationCircle className="text-xl text-error" />,
    warning: <FaExclamationTriangle className="text-xl text-warning" />,
    info: <FaInfoCircle className="text-xl text-primary" />,
};

// ---------------------------------------------------------------- actions
export function toast({ type = 'success', title, text, duration = 4000, action }) {
    const id = ++uid;
    toasts.push({ id, type, title, text, duration, action });
    if (toasts.length > 4) toasts.shift();
    notify();
    window.setTimeout(() => dismissToast(id), duration);
    return id;
}

export function dismissToast(id) {
    const index = toasts.findIndex(t => t.id === id);
    if (index !== -1) {
        toasts.splice(index, 1);
        notify();
    }
}

function openDialog(config) {
    return new Promise(resolve => {
        dialogs.push({ ...config, resolve, id: ++uid });
        pumpDialogs();
    });
}

function pumpDialogs() {
    if (!activeDialog && dialogs.length) {
        activeDialog = dialogs.shift();
        notify();
    }
}

export function closeDialog(value) {
    const dialog = activeDialog;
    activeDialog = null;
    notify();
    if (dialog) dialog.resolve(value);
    pumpDialogs();
}

function updateDialogValue(value) {
    if (activeDialog) activeDialog.value = value;
}

export function confirmDialog({
    title,
    text,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    danger = false,
    type = 'warning',
}) {
    return openDialog({ kind: 'confirm', title, text, confirmText, cancelText, danger, type });
}

export function promptDialog({
    title,
    text,
    placeholder = '',
    initial = '',
    confirmText = 'Send',
    cancelText = 'Cancel',
    type = 'info',
}) {
    return openDialog({ kind: 'prompt', title, text, placeholder, initial, confirmText, cancelText, type });
}

export function alertDialog({ title, text, confirmText = 'OK', type = 'info' }) {
    return openDialog({ kind: 'alert', title, text, confirmText, type });
}

// ---------------------------------------------------------------- store hook
function useStore() {
    const [, setTick] = useState(0);
    useEffect(() => {
        const listener = () => setTick(tick => tick + 1);
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(candidate => candidate !== listener);
        };
    }, []);
}

// ---------------------------------------------------------------- toast stack
const ToastStack = () => {
    useStore();

    return (
        <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(22rem,calc(100vw-2rem))] flex-col gap-2">
            <AnimatePresence>
                {toasts.map(t => (
                    <motion.div
                        key={t.id}
                        layout
                        initial={{ opacity: 0, y: 24, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="pointer-events-auto surface flex items-start gap-3 rounded-2xl bg-base-100 p-4 ring-1 ring-base-300/70 shadow-glow"
                        role="status"
                    >
                        <span className="mt-0.5 shrink-0">{ICONS[t.type] || ICONS.info}</span>
                        <div className="min-w-0 flex-1 space-y-0.5">
                            {t.title && <p className="text-sm font-bold leading-snug">{t.title}</p>}
                            {t.text && <p className="text-xs leading-relaxed text-base-content/60">{t.text}</p>}
                            {t.action && (
                                <button
                                    type="button"
                                    onClick={t.action.onClick}
                                    className="btn btn-primary btn-xs mt-1 rounded-full px-4 normal-case"
                                >
                                    {t.action.label}
                                </button>
                            )}
                        </div>
                        <button
                            type="button"
                            aria-label="Dismiss"
                            onClick={() => dismissToast(t.id)}
                            className="btn btn-ghost btn-xs btn-circle shrink-0 text-base-content/40 hover:text-base-content"
                        >
                            <FaTimes />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

// ---------------------------------------------------------------- dialog
const PromptTextarea = ({ value, onChange, placeholder }) => (
    <textarea
        autoFocus
        value={value}
        onChange={event => onChange(event.target.value)}
        placeholder={placeholder}
        rows={4}
        className="textarea textarea-bordered w-full rounded-2xl bg-base-100 text-sm focus:border-primary focus:outline-none"
    />
);

const DialogHost = () => {
    useStore();
    const dialog = activeDialog;
    const close = () => closeDialog(dialog?.kind === 'prompt' ? null : dialog?.kind === 'confirm' ? false : undefined);

    useEffect(() => {
        const onKey = event => {
            if (event.key !== 'Escape') return;
            const current = activeDialog;
            if (!current) return;
            closeDialog(current.kind === 'prompt' ? null : current.kind === 'confirm' ? false : undefined);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AnimatePresence>
            {dialog && (
                <motion.div
                    key={dialog.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[110] grid place-items-center bg-neutral/45 p-4 backdrop-blur-sm"
                    onMouseDown={event => {
                        if (event.target === event.currentTarget) close();
                    }}
                    role="dialog"
                    aria-modal="true"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 8 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="surface w-full max-w-md overflow-hidden rounded-3xl bg-base-100 shadow-glow"
                    >
                        <div className="flex items-start gap-4 p-6">
                            {dialog.kind !== 'prompt' && (
                                <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-base-200">
                                    {ICONS[dialog.type] || ICONS.info}
                                </span>
                            )}
                            <div className="min-w-0 flex-1 space-y-1.5">
                                <h3 className="text-lg font-extrabold tracking-tight">{dialog.title}</h3>
                                {dialog.text && <p className="text-sm leading-relaxed text-base-content/60">{dialog.text}</p>}
                                {dialog.kind === 'prompt' && (
                                    <div className="pt-2">
                                        <PromptTextarea
                                            placeholder={dialog.placeholder}
                                            initial={dialog.initial}
                                            value={dialog.value ?? dialog.initial ?? ''}
                                            onChange={updateDialogValue}
                                        />
                                    </div>
                                )}
                            </div>
                            <button
                                type="button"
                                aria-label="Close"
                                onClick={close}
                                className="btn btn-ghost btn-xs btn-circle shrink-0 text-base-content/40 hover:text-base-content"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div className="flex justify-end gap-2 border-t border-base-300/60 bg-base-200/50 px-6 py-4">
                            {dialog.kind !== 'alert' && (
                                <button type="button" onClick={close} className="btn btn-ghost rounded-full px-6 normal-case">
                                    {dialog.cancelText || 'Cancel'}
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => closeDialog(
                                    dialog.kind === 'confirm' ? true
                                        : dialog.kind === 'prompt' ? (dialog.value ?? dialog.initial ?? '')
                                        : undefined
                                )}
                                className={`btn rounded-full px-6 normal-case ${
                                    dialog.kind === 'confirm' && dialog.danger
                                        ? 'btn-error text-white'
                                        : 'btn-primary'
                                }`}
                            >
                                {dialog.kind === 'confirm' ? dialog.confirmText || 'Confirm'
                                    : dialog.kind === 'prompt' ? dialog.confirmText || 'Send'
                                    : dialog.confirmText || 'OK'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const FeedbackHost = () => (
    <>
        <ToastStack />
        <DialogHost />
    </>
);

export default FeedbackHost;