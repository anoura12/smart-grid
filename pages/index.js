import Layout from "../src/layout";
import DashboardView from "../src/dashboard";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {useAuth} from "../src/useAuth";

const IndexPage = () => {

    const router = useRouter();
    const [isLoggedIn, isLoading] = useAuth();

    useEffect(() => {
        if(!isLoading && !isLoggedIn){
            router.push("/login");
        }
    }, [isLoading]);

    return (
        <Layout>
            <div className="flex justify-center items-center p-2">
                <div className="p-3" style={{ width: '1200px', maxWidth: '100%' }}>
                    <DashboardView />
                </div>
            </div>
        </Layout>
    );
}

export default IndexPage;
