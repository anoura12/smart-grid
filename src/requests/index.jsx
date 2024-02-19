import React, {useEffect, useRef, useState} from "react";
import RequestsCard from "./card";

function InnerHTML(props) {
    const { html } = props
    const divRef = useRef(null)

    useEffect(() => {
        const parsedHTML = document.createRange().createContextualFragment(html)
        if(divRef && divRef?.current){
            divRef.current.appendChild(parsedHTML)
        }
    }, [])


    return (
        <div ref={divRef}></div>
    )
};

const FirmwareRequests = () => {

    const [requests, setRequests] = useState();
    const [admin, setAdmin] = useState();
    const [error, setError] = useState();

    const fetchRequests = () => {
        fetch(`/api/view-requests`, {
            method: 'POST',
            mode: 'cors',
        }).then((r) => {
            if(r.ok)
                r.json().then((data) => {
                    if(data?.error)
                        setError(data.error);
                    else {
                        setAdmin(data?.isAdmin)
                        setRequests(data?.requests);
                    }
                });
            else setError("Failed to login. Please try again");
        })
    };

    useEffect(fetchRequests, []);

    const removeRequest = (index) => {
        const newRequests = [...requests];
        newRequests.splice(index, 1);
        setRequests([...newRequests]);
    };

    return (
        <div>
            <div className="py-3">
                <h1 className="font-semibold text-3xl mb-3">My Requests</h1>
            </div>
            {requests?.length > 0 ?
                requests.map((r, index) => (
                    <RequestsCard isAdmin={admin} key={r.device_id} r={r} onRemove={() => removeRequest(index)} />
                )) : (
                    <div> Loading</div>
                )}
        </div>
    );

};

export default FirmwareRequests;