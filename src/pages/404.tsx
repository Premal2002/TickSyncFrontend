import React from 'react';

export default function NotFound() {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center bg-gray-900">
            <h1 className="text-3xl font-bold">404 - Not Found</h1>
            <p className="mt-2">The resource you are looking for is not found.</p>
        </div>
    );
}