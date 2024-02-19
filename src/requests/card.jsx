import React, {useEffect, useRef} from "react";

function InnerHTML({ html }) {
    const divRef = useRef(null)

    useEffect(() => {
        const parsedHTML = document.createRange().createContextualFragment(html)
        if(parsedHTML && divRef && divRef?.current && typeof divRef?.current?.appendChild === 'function') {
            try {
                divRef.current.appendChild(parsedHTML)
            } catch (error) {
                console.log(error);
            }
        }

    }, [])


    return (
        <div ref={divRef} />
    )
};

const RequestsCard = ({ isAdmin = false, r, onRemove = () => {} }) => {

    const approveRequest = () => {
        fetch(`/api/approve-request`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                device_id: r.device_id
            })
        }).then((r) => {
            if(r.ok)
                onRemove();
        })
    };

    const rejectRequest = () => {
        fetch(`/api/deny-request`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                device_id: r.device_id
            })
        }).then((r) => {
            if(r.ok)
                onRemove();
        })
    };

    return (
        <div className="bg-white mb-3 rounded-lg shadow">
            <div className="mb-2 p-6">
                <InnerHTML html={r.reason} />
            </div>
            {isAdmin &&
            <div className="flex flex-wrap">
                <div className="w-1/2">
                    <button className="bg-green-500 rounded-bl-lg text-white p-3 w-full text-lg approve-button" onClick={approveRequest}>
                        Approve
                    </button>
                </div>
                <div className="w-1/2">
                    <button className="bg-red-500 text-white rounded-br-lg w-full p-3 text-lg reject-button" onClick={rejectRequest}>
                        Reject
                    </button>
                </div>
            </div>}
        </div>
    );

};

export default RequestsCard;