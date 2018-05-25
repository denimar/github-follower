import React from 'react'

export const CredentialContext = React.createContext({
  authorizationHeader: null,
  userProfile: {},
  setCredential: () => {},
  logOut: () => {}
})