import axios from 'axios'
import Constant from '../util/Constant'

class RepositoryService {

  static fetchAll() {
    return new Promise((successFn, failureFn) => {
      const url = `${Constant.NODE_SERVER_URL}/repository/all`;
      axios.get(url).then((response) => {
        successFn(_normalizeData(response.data))
      })
      .catch((err) => {
        failureFn(err)
      });
    });  
  }

  static removeItem(repositoryId) {
    return new Promise((successFn, failureFn) => {
      const url = `${Constant.NODE_SERVER_URL}/repository/remove/${repositoryId}`;
      axios.post(url).then((response) => {
        successFn(response.data)
      })
      .catch((err) => {
        failureFn(err)
      });
    });  
  }  

  static updateItem(item) {
    return new Promise((successFn, failureFn) => {
      const url = `${Constant.NODE_SERVER_URL}/repository/update`;
      axios.post(url, item).then((response) => {
        successFn(response.data)
      })
      .catch((err) => {
        failureFn(err)
      });
    });  
  }    

  static addItem(item) {
    return new Promise((successFn, failureFn) => {
      const url = `${Constant.NODE_SERVER_URL}/repository/add`;
      axios.post(url, item).then((response) => {
        successFn(response.data)
      })
      .catch((err) => {
        failureFn(err)
      });
    });  
  }    

  static fetchSelecteds() {
    return new Promise((successFn, failureFn) => {
      const url = `${Constant.NODE_SERVER_URL}/repository/selected`;
      axios.get(url).then((response) => {
        successFn(_normalizeData(response.data))
      })
      .catch((err) => {
        failureFn(err)
      });
    });  
  }  

  static async addSelected(itemToAdd) {
    const url = `${Constant.NODE_SERVER_URL}/repository/selected/add/${itemToAdd.id}`
    try {
      let response = await axios.post(url)    
      return response
    } catch(error) {
      throw new Error('Error adding selected repository')
    }
  }    

  static async removeSelected(itemToRemove) {
    const url = `${Constant.NODE_SERVER_URL}/repository/selected/remove/${itemToRemove.id}`
    try {
      let response = await axios.post(url)    
      return response
    } catch(error) {
      throw new Error('Error removing selected repository')
    }
  }    
  
  static fetchRepositoryInfo(repositoryFullName, gitHubToken) {
    return new Promise((successFn, failureFn) => {
      const url = `https://api.github.com/repos/${repositoryFullName}?${gitHubToken}`;
      axios.get(url).then((response) => {
        successFn(response.data)
      })
      .catch((err) => {
        failureFn(err)
      });
    });        
  }
  
}

function _normalizeData(responseData) {
  let data = responseData || []
  return data.map(item => {
    let fullName = item.fullName || item['repository.fullName']
    let loginAndName = fullName.split('/')
    return {
      id: item.id || item['repository.id'],
      fullName: fullName,
      login: loginAndName[0],
      name: loginAndName[1]
    } 
  })
}

export default RepositoryService