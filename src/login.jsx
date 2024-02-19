import React, {useState} from "react";
import {useAuth} from "./useAuth";
import {useRouter} from "next/router";

const LoginForm = () => {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const login = (e) => {
        e.preventDefault();
        fetch(`/api/login?username=${email}&&password=${password}`, {
            method: 'POST',
            mode: 'cors',
        }).then((r) => {
            if(r.ok)
                r.json().then((data) => {
                    if(data?.error)
                        setError(data.error);
                    else {
                        router.push(`/`);
                    }
                });
            else setError("Failed to login. Please try again");
        })
    };

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-center text-3xl font-semibold my-2">Login</h2>
            <div className="p-4">
                <form onSubmit={login}>
                    {error && (
                        <div className="p-2 rounded-lg mb-3 bg-red-200">{error}</div>
                    )}
                    <div className="p-2">
                        <label className="mb-2 opacity-80 px-2 block" htmlFor="username">
                           Username
                        </label>
                        <input
                            className="border bg-gray-100 border border-gray-300 outline-none rounded-lg p-2 w-full"
                            name="username"
                            id="username"
                            placeholder="Enter your username"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="p-2">
                        <label className="mb-2 opacity-80 px-2 block" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="border bg-gray-100 border border-gray-300 outline-none rounded-lg p-2 w-full"
                            name="password"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="p-2 flex justify-end">
                        <button
                            type="submit"
                            id="login"
                            style={{ background: '#33DD11' }}
                            className="font-semibold w-full px-5 py-3 text-lg mt-3 rounded-lg hover:bg-green-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default LoginForm;