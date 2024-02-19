import React from "react";
import styled from "@emotion/styled";
import {useAuth} from "./useAuth";

const HeaderContainer = styled.header`
  background: #33AA11;
  padding: 1rem;
`;

const Header = () => {

    const [isLoggedIn, isLoading] = useAuth();

    return (
        <HeaderContainer className="shadow-lg mb-3">
            <div className="flex flex-wrap">
                <div className="w-1/2 flex item-center">
                    <div className="text-white text-xl">
                        Smart Grid Manager
                    </div>
                </div>
                <div className="w-1/2 flex justify-end items-center">
                    {!isLoading && (
                        <div>
                            {!isLoggedIn ?
                            <a href="/login" className="button px-5 rounded-lg py-2 shadow-lg font-semibold bg-white text-black">
                                Login
                            </a> :
                            <a href="/logout" className="button px-5 rounded-lg py-2 shadow-lg font-semibold bg-white text-black">
                                Log Out
                            </a>}
                        </div>
                    )}
                </div>
            </div>
        </HeaderContainer>
    );

};

export default Header;