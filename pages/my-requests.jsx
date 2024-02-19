import React, {useEffect} from "react";
import Layout from "../src/layout";
import FirmwareRequests from "../src/requests";
import {useRouter} from "next/router";
import {useAuth} from "../src/useAuth";
import Link from 'next/link'

const MyFirmwareRequests = () => {

    const router = useRouter();
    const [isLoggedIn, isLoading] = useAuth();

    useEffect(() => {
        if(!isLoading && !isLoggedIn){
            router.push("/login");
        }
    }, [isLoading]);

    return (
        <Layout title="My Firmware Requests">
            <div className="flex justify-center items-center p-2">
                <div className="p-3" style={{ width: '720px', maxWidth: '100%' }}>
                    <div className="mb-3 px-2">
                        <Link href="/">
                        <a className="hover:text-blue-600">Dashboard</a></Link> /
                    </div>
                    <FirmwareRequests />
                </div>
            </div>
        </Layout>
    );
}

export default MyFirmwareRequests;