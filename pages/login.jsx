import React, {useEffect} from "react";
import Layout from "../src/layout";
import LoginForm from "../src/login";
import {useRouter} from "next/router";
import {useAuth} from "../src/useAuth";

const LoginPage = () => {

    const router = useRouter();
    const [isLoggedIn, isLoading] = useAuth();

    useEffect(() => {
        if(!isLoading && isLoggedIn){
            router.push("/login");
        }
    }, [isLoading]);

    return (
        <Layout title="Login">
            <div className="flex justify-center items-center p-2">
                <div className="p-3" style={{ width: '720px', maxWidth: '100%' }}>
                    <LoginForm />
                </div>
            </div>
        </Layout>
    );
}

export default LoginPage;