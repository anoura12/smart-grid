import React, {useEffect} from "react";
import Layout from "../src/layout";
import {useRouter} from "next/router";

const LogoutPage = () => {

    const router = useRouter();

    useEffect(() => {
        fetch(`/api/logout`, {
            method: 'POST',
            mode: 'cors',
        }).then((r) => {
            router.push('/');
        });
    }, []);

    return (
        <Layout title="Logout">
            <div className="flex justify-center items-center p-2">
                <div className="p-3" style={{ width: '720px', maxWidth: '100%' }}>
                    <h1>Logging You Out.</h1>
                    <div>Please wait</div>
                </div>
            </div>
        </Layout>
    );
}

export default LogoutPage;