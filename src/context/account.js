import React from 'react'

const GlobalContext = React.createContext()

function AccountProvider(props) {
    const [address, setaddress] = React.useState(null)
    const value = React.useMemo(() => ({ address, setaddress }), [address])
    return <GlobalContext.Provider value={value} {...props} />
}

function useAccount() {
    const context = React.useContext(GlobalContext)
    if (!context) throw new Error('useAccount must be used within a AccountProvider')
    return context
}
export { AccountProvider, useAccount }