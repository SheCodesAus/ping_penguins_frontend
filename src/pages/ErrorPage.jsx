import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center p-8 bg-black rounded-lg shadow-md">
                <h1 className="text-6xl font-bold text-red-500">Oops!</h1>
                <p className="text-2xl mt-4">Sorry, an error occurred</p>
                <p className="text-gray-600 mt-2">
                    {error.statusText || error.message}
                    </p>
            </div>
        </div>
    );
}