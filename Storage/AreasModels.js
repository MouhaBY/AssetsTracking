import { openDatabase } from 'react-native-sqlite-storage'


export default class Areas{

    async initDB(){
        const db = await openDatabase({name: 'data.db'})
        return(db)
    }
    
    async createTableAreas(){
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Areas (id INTEGER UNIQUE PRIMARY KEY, code TEXT NOT NULL UNIQUE, name TEXT NOT NULL)', [], 
                (tx, results) => { 
                    resolve(results)
                    console.log('table areas created')
                })
            })
        })
    }

    async DeleteTableAreas(){
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'DELETE FROM Areas', [], 
                (tx, results) => {
                    resolve(results)
                    console.log('table areas deleted')
                })
            })
        })
    }

    async insertIntoAreas(data_to_insert){
        console.log('insert areas')
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            var len = data_to_insert.length;
            for (let i = 0; i < len; i++) {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Areas (id, code, name) VALUES (?, ?, ?)', 
                    [data_to_insert[i].id, data_to_insert[i].code, data_to_insert[i].name],)
                })
            }
            resolve(console.log('Areas inserted'))
        })
    }

    async getAreas() {
        const  db = await this.initDB()
        return new Promise((resolve) => {
            const areas = []
            db.transaction((tx) => {
                tx.executeSql(
                'SELECT id, code, name FROM Areas', [],
                (tx, results) => {
                    var len = results.rows.length
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i)
                        const { id, code, name } = row
                        areas.push({
                            id,
                            code,
                            name
                          })
                    }   
                    resolve(areas)              
                })
            })
        })
    }

    async searchArea(location) {
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'SELECT id, code, name FROM Areas WHERE code = ?', [location],
                (tx, results) => {
                    var len = results.rows.length
                    if (len > 0) { resolve(results.rows.item(0)) }
                    else{ reject('Area unknown') }
                })
            })
        })
    }    

    async searchAreaById(area_id) {
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'SELECT id, code, name FROM Areas WHERE id = ?', [area_id],
                (tx, results) => {
                    var len = results.rows.length
                    if (len > 0) { resolve(results.rows.item(0)) }
                    else{ reject('Area unknown') }
                })
            })
        })
    }    

}
