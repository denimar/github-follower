//const BASE_ENDPOINTS = 'https://github-follower.herokuapp.com'
const BASE_ENDPOINTS = ''

export default {

  ENDPOINT: {
    CREDENTIAL_AUTHENTICATION: `${BASE_ENDPOINTS}/credential/authentication`,
    CREDENTIAL_USER: `${BASE_ENDPOINTS}/credential/user`,

    PARAM: `${BASE_ENDPOINTS}/param`,

    SELECTED_REPOSITORY: `${BASE_ENDPOINTS}/repository/selected`,
    SELECTED_REPOSITORY_ADD: `${BASE_ENDPOINTS}/repository/selected/add/:repositoryId`,    
    SELECTED_REPOSITORY_REMOVE: `${BASE_ENDPOINTS}/repository/selected/remove/:repositoryId`,        
    REPOSITORY: `${BASE_ENDPOINTS}/repository/all`,    
    REPOSITORY_ADD: `${BASE_ENDPOINTS}/repository/add`,        
    REPOSITORY_REMOVE: `${BASE_ENDPOINTS}/repository/remove/:repositoryId`,        
    REPOSITORY_UPDATE: `${BASE_ENDPOINTS}/repository/update`,        
    BRANCH: `${BASE_ENDPOINTS}/branch/:repositoryId`,    
  }

}
