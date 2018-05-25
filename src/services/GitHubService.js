// Apollo
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
// GraphQL
import { graphql } from 'react-apollo';
import GitHub from 'github-api'

class GitHubService {

  static gitHubAuthenticate(username, password) {
    let githubObj = new GitHub({ username, password })
    return GitHubService._gitHubAuthenticateByGitHubObj(githubObj)
  }

  static gitHubAuthenticateByToken(token) {  
    let githubObj = new GitHub({ token })    
    return GitHubService._gitHubAuthenticateByGitHubObj(githubObj)
  }  

  static async _gitHubAuthenticateByGitHubObj(githubObj) {  
    try {
      let user = githubObj.getUser()
      let userProfileResponse = await user.getProfile();
      let userProfile = userProfileResponse.data
      return {
        authorizationHeader: user.__authorizationHeader,
        userProfile
      }  
    } catch(error) {
      return {
        errorMessage: error.response.data.message
      }  
    }
  }  

  static getAppoloClient() {
    if (GitHubService.appoloClient === undefined) {
      const httpLink = createHttpLink({ uri: 'https://api.github.com/graphql' });
      const middlewareLink = new ApolloLink((operation, forward) => {
        operation.setContext({
          headers: {
            //authorization: `Bearer e27b452de41d7c09129b594258de95ba8e4ee57b`
            authorization: 'Basic ZGVuaW1hcjpEbTkwNDYwMA=='
          }
        });
        return forward(operation)
      })      
      const link = middlewareLink.concat(httpLink);
      GitHubService.appoloClient = new ApolloClient({
        link,
        cache: new InMemoryCache()
      })
    }
    return GitHubService.appoloClient  
  }  

  static withInfo(infoQuery, variables) {
    return graphql(infoQuery, {
      options: () => {
        return { variables }
      },
      props: ({ data }) => {
        // loading state
        if (data.loading) {
          return { loading: true };
        }    
        // error state
        if (data.error) {
          console.error(data.error);
        }    
        // OK state
        return { data };
      },
    });
  }  

}

export default GitHubService