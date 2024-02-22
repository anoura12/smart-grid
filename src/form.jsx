import React, { useState } from "react";
import Image from 'next/image';

const RequestForm = () => {

    const [serialNumber, setSerialNumber] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const submitRequest = (e) => {
        e.preventDefault();
        fetch(`/api/request-access`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                serial_number: serialNumber,
                message: message
            })
        }).then((r) => {
            if(r.ok)
                r.json().then((data) => {
                    if(data?.error)
                        setError(data.error);
                    else {
                        setSubmitted(true);
                    }
                });
            else setError("Failed to change to password. Please try again");
        });
    };

    return submitted ? (
        <div className="bg-white text-center rounded-lg p-6 shadow">
            {/* <Image
                width={100}
                height={100}
                src={require('./images/checkmark.webp')}
            /> */}
            <h2 className="text-center text-3xl font-semibold my-2">Request Sent</h2>
            <p className="opacity-80 mb-5">
                Your request has been sent. Our team will quickly review your request and
                release the firmware. This should typically take few minutes. Thank you for
                your patience.
            </p>
            <a href="/" className="bg-green-400 font-semibold px-4 py-2 rounded-lg">
                Return to Home
            </a>
        </div>
    ) : (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-center text-2xl font-semibold my-2">Request Firmware</h2>
            <div className="flex justify-center">
                <p className="opacity-80 w-4/5 text-center">
                    Please fill out the form below to request firmware for
                    your hardware. We will manually review this request and let you know.
                </p>
            </div>
            <div className="p-4">
                <form onSubmit={submitRequest}>
                    {error && (
                        <div className="p-2 rounded-lg mb-3 bg-red-200">{error}</div>
                    )}
                    <div className="p-2">
                        <label className="mb-2 opacity-80 px-2 block" htmlFor="serial_num">
                            Serial Number <sup className="text-red-500">*</sup>
                        </label>
                        <input
                            className="border bg-gray-100 border border-gray-300 outline-none rounded-lg p-2 w-full"
                            id="serial_num"
                            type="text"
                            required
                            placeholder="Enter serial number of your hardware"
                            value={serialNumber}
                            onChange={(e) => setSerialNumber(e.target.value)}
                        />
                    </div>
                    <div className="p-2">
                        <label className="mb-2 opacity-80 px-2 block" htmlFor="message">
                            Request Message <sup className="text-red-500">*</sup>
                        </label>
                        <textarea
                          name="message"
                          className="w-full bg-gray-100 border border-gray-300 outline-none rounded-lg p-2"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={6}
                          required
                          placeholder="Describe why you need the firmware"
                        />
                    </div>
                    <div className="p-2 flex justify-end">
                        <button
                            type="submit"
                            style={{ background: '#33DD11' }}
                            className="font-semibold px-5 py-2 rounded-lg hover:bg-green-500"
                        >
                            Send Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default RequestForm;