import { useEffect, useState } from 'react';

export const useAuth = () => {

    const [isLoggedIn, _setLoggedIn] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const setLoggedIn = (state) => {
        _setLoggedIn(state);
    };

    const getAuthState = () => {
        fetch(`/api/my-status`, {
            method: 'POST',
            mode: 'cors',
        }).then((r) => {
            if(r.ok)
                r.json().then((data) => {
                    _setLoggedIn(data.username !== null);
                    setLoading(false);
                });
        })
    }

    useEffect(getAuthState, []);

    return [isLoggedIn, isLoading, setLoggedIn];

};