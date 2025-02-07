// 'use client'

// import React from 'react'
// import { useRouter } from 'next/navigation'
// import { useState, useEffect } from 'react'

// const Layout = ({ children }) => {

//     const router = useRouter();
//     const [currentRoute, setCurrentRoute] = useState(router.pathname);

//     useEffect(() => {

//         // Listen for route changes
//         const handleRouteChange = (url) => {
//             setCurrentRoute(url);
//         }

//         router.events.on('routeChangeStart', handleRouteChange);

//         // Cleanup the listener on unmount
//         return () => {
//             router.events.off('routeChangeStart', handleRouteChange);
//         };
//     }, [])

//     return (
//         <>
//             {currentRoute === '/questions/1' && <div>Hey</div> }
//         </>
//     )
// }

// export default Layout

// components/Layout.js
// import React from 'react'

// const Layout = () => {
//   return (
//     <div>Layout</div>
//   )
// }

// export default Layout
