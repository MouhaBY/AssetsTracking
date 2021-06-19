const API_TOKEN = "f78171b682bc4c08986c8067a8113ce6"


export async function getWhatToSync(){
    return new Promise((resolve, reject) => { 
        resolve( { results: [] } )
    })
}

export function getProducts() {
    return new Promise((resolve, reject) => { 
        resolve( { results: [ {id:"1", code: "1", name: "Article 1"}, {id:"2", code: "2", name: "Article 2"},  ] } ) 
    })
}

export function getLocations() {
    return new Promise((resolve, reject) => { 
        resolve( { results: [ {id:"11", code: "10", name: "Emplacement 10"}, {id:"12", code: "20", name: "Emplacement 20"},  ] } ) 
    })
}

export function getUsers() {
    return new Promise((resolve, reject) => { 
        resolve( { results: [ {id:4, username:"123", password:"123", contact:'Admin 123', isAdmin:1}, 
        {id:5, username:"1", password:"1", contact:'user 1', isAdmin:0}, 
        {id:7, username:"Test", password:"test", contact:'test user 1', isAdmin:0} ] } ) 
    })
}


/*export function getInventories() {
    //const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
    const url = 'https://api.' + API_TOKEN
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}*/

/*
export const sendInventoriesDetails = async (inventoriesData) => {
    const response = await fetch('http://localhost:8000', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({inventoriesData}),
    })
  
    if (response.ok) {
      return true
    }
  
    const errMessage = await response.text()
    throw new Error(errMessage)
}
*/
/*
  export const fetchUsers = async () => {
    const response = await fetch('https://randomuser.me/api/?results=50&nat=us')
    const {results} = await response.json()
    return results
  }
*/