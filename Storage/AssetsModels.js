import { openDatabase } from 'react-native-sqlite-storage'


export default class Assets{

    async initDB(){
        const db = await openDatabase({name: 'data.db'})
        return(db)
    }
    
    async createTableAssets(){
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Assets (id INTEGER UNIQUE PRIMARY KEY, code TEXT NOT NULL UNIQUE, name TEXT NOT NULL, area_id TEXT)', [], 
                (tx, results) => {
                    resolve(results)
                    console.log('Table Assets created')
                })
            })
        })
    }

    async DeleteTableAssets(){
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                'DELETE FROM Assets', [], 
                (tx, results) => {
                    resolve(results)
                    console.log('table Assets deleted')
                })
            })
        })
    }

    async insertIntoAssets(data_to_insert){
        console.log('insert Assets')
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            var len = data_to_insert.length;
            for (let i = 0; i < len; i++) {
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO Assets (id, code, name, area_id) VALUES (?, ?, ?, ?)', 
                    [data_to_insert[i].id, data_to_insert[i].code, data_to_insert[i].name, data_to_insert[i].area_id],)
                })
            }
            resolve(console.log('Assets inserted'))
        })
    }

    async getAssets() {
        const  db = await this.initDB()
        return new Promise((resolve) => {
            const products = []
            db.transaction((tx) => {
                tx.executeSql(
                'SELECT id, code, name, area_id FROM Assets', [],
                (tx, results) => {
                    var len = results.rows.length
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i)
                        const { id, code, name } = row
                        products.push({
                            id,
                            code,
                            name
                          })
                    }
                    resolve(products)              
                })
            })
        })
    }

    async searchAssets(area) {
        const  db = await this.initDB()
        return new Promise((resolve) => {
            const assets = []
            db.transaction((tx) => {
                tx.executeSql(
                'SELECT id, code, name, area_id FROM Assets WHERE area_id = ?', [area],
                (tx, results) => {
                    var len = results.rows.length
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i)
                        const { id, code, name, area_id } = row
                        assets.push({
                            id,
                            code,
                            name,
                            area_id,
                          })
                    }
                    resolve(assets)              
                })
            })
        })
    }

    async searchAsset(asset_code) {
        const  db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql( 'SELECT id, code, name, area_id FROM Assets WHERE code = ?', [asset_code],
                (tx, results) => {
                    var len = results.rows.length
                    if (len > 0) { resolve(results.rows.item(0)) }
                    else{ reject('Assets unknown') }
                })
            })
        })
    }
}
