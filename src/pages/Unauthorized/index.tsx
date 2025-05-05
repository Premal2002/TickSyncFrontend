import React from 'react';

export default function UnauthorizedPage() {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center bg-gray-900">
            <h1 className="text-3xl font-bold">401 - Unauthorized</h1>
            <p className="mt-2">You are not authorized to view the page.</p>
        </div>
    );
}