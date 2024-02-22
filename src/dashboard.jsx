import React, {useEffect, useState} from "react";
import Image from "next/image";

const DashboardView = () => {

    const [flag, setFlag] = useState(null);

    const userOptions = [
        {
            href: "/request-firmware",
            // icon: require('./images/web-dev.webp'),
            title: "Request Firmware",
        },
        {
            href: "/my-requests",
            // icon: require('./images/requests.webp'),
            title: "My Requests",
        },
        {
            href: "/change-password",
            // icon: require('./images/password.webp'),
            title: "Change Password",
        },
    ];

    const getFlag = () => {
        fetch(`/api/flag`, {
            method: 'GET',
            mode: 'cors',
        }).then((r) => {
            if(r.ok)
                r.json().then((data) => {
                    setFlag(data?.flag)
                });
        })
    }

    useEffect(getFlag, []);

    return (
        <div>
            <div className="py-5">
                <h1 className="font-semibold text-4xl">Dashboard</h1>
                {flag && <h2>{flag}</h2>}
            </div>
            <div className="flex flex-wrap">
                {userOptions.map((option, index) => {
                    return (
                        <div className="w-1/3 p-2">
                            <a
                                href={option.href}
                                className="bg-white block shadow-lg text-center p-4 rounded-lg"
                                key={index}
                            >
                                <Image
                                    width={120}
                                    height={120}
                                    src={option.icon}
                                />
                                <div className="font-semibold text-lg">{option.title}</div>
                            </a>
                        </div>
                    );
                })}
            </div>
        </div>
    );

};

export default DashboardView;