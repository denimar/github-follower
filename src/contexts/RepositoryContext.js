import React from 'react'

export const RepositoryContext = React.createContext({
  repositories: [],
  setRepositories: () => {}
})