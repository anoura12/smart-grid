import Layout from "../src/layout";
import PasswordChangeForm from "../src/password-change";
import {useRouter} from "next/router";
import {useEffect} from "react";
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
        <Layout title="Change Password">
            <div className="flex justify-center items-center p-2">
                <div className="p-3" style={{ width: '720px', maxWidth: '100%' }}>
                    <div className="mb-3 px-2">
                        <Link href="/">
                            <a className="hover:text-blue-600">Dashboard</a></Link> /
                    </div>
                    <PasswordChangeForm />
                </div>
            </div>
        </Layout>
    );
}

export default RequestFirmwarePage;
