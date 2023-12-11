import React, { createContext, useState } from 'react'
export const loginContext = createContext()
export const adminLogincontext = createContext()

function ContextShare({ children }) {
    const [loggined, setLoggined] = useState(false)
    const [adminLoggin, setAdminloggin] = useState(false)
    return (
        <>
            <adminLogincontext.Provider value={{adminLoggin,setAdminloggin}}>
                <loginContext.Provider value={{ loggined, setLoggined }}>
                    {children}
                </loginContext.Provider>
            </adminLogincontext.Provider>
        </>
    )
}

export default ContextShare