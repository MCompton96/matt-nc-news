import React from 'react';

const ErrorHandle = ({ status, msg}) => {
    return (
        <div>
            <h2>
                Error {status}
            </h2>
        </div>
    );
};

export default ErrorHandle;