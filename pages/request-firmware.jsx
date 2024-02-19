import Layout from "../src/layout";
import RequestForm from "../src/form";
import {useRouter} from "next/router";
import {useEffect} from "react";
import store from "store2";
import {useCookies} from "react-cookie";
import {useAuth} from "../src/useAuth";
import Link from 'next/link'

const RequestFirmwarePage = () => {

    const router = useRouter();
    const [isLoggedIn, isLoading] = useAuth();

    useEffect(() => {
        if(!isLoading && !isLoggedIn){
            router.push("/login");
        }
    }, [isLoading]);

    return (
        <Layout title="Request Firmware">
            <div className="flex justify-center items-center p-2">
                <div className="p-3" style={{ width: '720px', maxWidth: '100%' }}>
                    <div className="mb-3 px-2">
                        <Link href="/">
                        <a className="hover:text-blue-600">Dashboard</a></Link> /
                    </div>
                    <RequestForm />
                </div>
            </div>
        </Layout>
    );
}

export default RequestFirmwarePage;
