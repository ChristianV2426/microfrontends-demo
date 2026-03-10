import React, { Suspense } from 'react';

const ReactApp = React.lazy(() => import('reactmf-app/App'));
const VueApp = React.lazy(() => import('./components/VueApp'));

export default function App() {
    return (
        <div className="flex h-screen w-screen bg-white">
            {/* Left column - React Microfrontend */}
            <div className="w-1/2 h-full border-r-2 border-gray-800 overflow-auto bg-gray-50">
                <div className="p-4 bg-gray-200 border-b border-gray-400">
                    <strong>React Microfrontend</strong>
                </div>
                <Suspense fallback={
                    <div className="p-8 bg-yellow-100 text-base">
                        Loading React MF...
                    </div>
                }>
                    <ReactApp />
                </Suspense>
            </div>

            {/* Right column - Vue Microfrontend placeholder */}
            <div className="w-1/2 h-full overflow-auto bg-gray-100">
                <div className="p-4 bg-gray-300 border-b border-gray-400">
                    <strong>Vue Microfrontend</strong>
                </div>
                <Suspense fallback={
                    <div className="p-8 bg-yellow-100 text-base">
                        Loading Vue MF...
                    </div>
                }>
                    <VueApp />
                </Suspense>
            </div>
        </div>
    );
}
