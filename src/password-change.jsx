import React, { useState } from "react";

const PasswordChangeForm = () => {

    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [error, setError] = useState(null);

    const changePassword = (e) => {
        e.preventDefault();
        if(password !== confirmPass){
            setError('Passwords do not match');
        }
        fetch(`/api/change-password?password=${password}`, {
            method: 'POST',
            mode: 'cors',
        }).then((r) => {
            if(r.ok)
                r.json().then((data) => {
                    if(data?.error)
                        setError(data.error);
                    else {
                        alert("Password Change Successful");
                    }
                });
            else setError("Failed to change to password. Please try again");
        })
    };

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-center text-3xl font-semibold my-2">Change Your Password</h2>
            <div className="p-4">
                <form onSubmit={changePassword}>
                    {error && (
                        <div className="p-2 rounded-lg mb-3 bg-red-200">{error}</div>
                    )}
                    <div className="p-2">
                        <label className="mb-2 opacity-80 px-2 block" htmlFor="new_password">
                            New Password <sup className="text-red-500">*</sup>
                        </label>
                        <input
                            className="border bg-gray-100 border border-gray-300 outline-none rounded-lg p-2 w-full"
                            name="new_password"
                            type="password"
                            placeholder="Enter a strong password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="p-2">
                        <label className="mb-2 opacity-80 px-2 block" htmlFor="confirm_password">
                            Confirm Password <sup className="text-red-500">*</sup>
                        </label>
                        <input
                            className="border bg-gray-100 border border-gray-300 outline-none rounded-lg p-2 w-full"
                            name="confirm_password"
                            type="password"
                            placeholder="Re-enter your new password"
                            value={confirmPass}
                            required
                            onChange={(e) => setConfirmPass(e.target.value)}
                        />
                    </div>
                    <div className="p-2 flex justify-end">
                        <button
                            type="submit"
                            style={{ background: '#33DD11' }}
                            className="font-semibold px-5 py-2 rounded-lg hover:bg-green-500"
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default PasswordChangeForm;