const API_TOKEN = "f78171b682bc4c08986c8067a8113ce6"


export async function getWhatToSync(){
    return new Promise((resolve, reject) => { 
        resolve( { results: ['Users', 'Areas', 'Assets', 'Inventories'] } )
    })
}

export function getInventories() {
    return new Promise((resolve, reject) => { 
        resolve( { results: [ 
            {id:"1", name: "Inventaire 2020", date: "31/12/2020", state:'1'}, 
            {id:"2", name: "Inventaire tournant", date: "01/05/2021", state:'1'},
            {id:"3333", name: "Inventaire de test", date: "20/06/2021", state:'1'}, 
            {id:"4", name: "Inventaire 2021", date: "31/12/2021", state:'1'}, 
            {id:"9", name: "Inventaire tournant 2", date: "01/02/2020", state:'0'},
            {id:"10", name: "Inventaire des biens informatiques", date: "06/06/2021", state:'1'}, 
        ] } ) 
    })
}

export function getInventoriesDetails() {
    return new Promise((resolve, reject) => { 
        resolve( { results: [
            {inventory_id:"1", area_id:"1", asset_id:"1", user_id:"4", date:"20/06/2021 10:10:10"},
            {inventory_id:"1", area_id:"1", asset_id:"2", user_id:"4", date:"20/06/2021 10:10:10"},
            {inventory_id:"1", area_id:"1", asset_id:"3", user_id:"5", date:"20/06/2021 10:10:10"},
            {inventory_id:"1", area_id:"2", asset_id:"4", user_id:"7", date:"20/06/2021 10:10:10"}, 
        ] } ) 
    })
}

export function getAssets() {
    return new Promise((resolve, reject) => { 
        resolve( { results: [ 
            {id:"1", code: "1", name: "ECRAN PC", area_id:"1"}, 
            {id:"2", code: "IMMO002", name: "ORDINATEUR",area_id:"2"},
            {id:"3", code: "IMMO003", name: "BUREAU EN BOIS", area_id:"1"}, 
            {id:"4", code: "IMMO004", name: "ECRAN PC",area_id:"1"},
            {id:"5", code: "IMMO005", name: "ORDINATEUR", area_id:"1"}, 
            {id:"6", code: "IMMO006", name: "TABLE RONDE",area_id:"1"},
            {id:"7", code: "IMMO007", name: "SERVEUR INFORMATIQUE", area_id:"7"}, 
            {id:"8", code: "IMMO008", name: "ECRAN PC",area_id:"7"},
            {id:"9", code: "IMMO009", name: "SWITCHER DELL", area_id:"7"}, 
            {id:"10", code: "IMMO010TANKMED180600014", name: "IMPRIMANTE",area_id:"3"},
        ] } ) 
    })
}

export function getAreas() {
    return new Promise((resolve, reject) => { 
        resolve( { results: [ 
            {id:"1", code: "B01", name: "Bureau de direction"}, 
            {id:"2", code: "B02", name: "Bureau Comptabilité"},
            {id:"3", code: "B03", name: "Salle de réunion"}, 
            {id:"4", code: "B04", name: "Bureau commercial"},
            {id:"5", code: "B05", name: "Salle d'attente"}, 
            {id:"6", code: "B06", name: "Acceuil"},
            {id:"7", code: "B07", name: "Salle serveur informatique"}, 
            {id:"8", code: "B08", name: "Bureau de finance"},
            {id:"9", code: "B09", name: "Bureau Assistante"}, 
            {id:"10", code: "B010", name: "Bureau DSI"},   
        ] } ) 
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