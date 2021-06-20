import { openDatabase, SQLite } from 'react-native-sqlite-storage'
import Users from './UsersModels'
import Configurations from './ConfigurationsModels'
import Areas from './AreasModels'
import Assets from './AssetsModels'
import Inventories from './InventoriesModels'
import Details from './InventoriesDetailsModels'


const User = new Users()
const Configuration = new Configurations()
const Area = new Areas()
const Asset = new Assets()
const Inventory = new Inventories()
const Detail = new Details()


export default class Database {

    async initDB(){
        const db = await openDatabase({name: 'data.db'})
        return(db)
    }

    checkDatabase = async () =>{
        const db = await this.initDB()
        return new Promise((resolve, reject) => {
            db.executeSql('SELECT 1 FROM Users LIMIT 1', [], 
            () => { console.log('Database exists'); resolve(true) }, 
            () => { console.log('Database not exists'); resolve(false) })
        })
    }

    createDatabase = async () => {
        try{
            const isCreated = await this.checkDatabase()
            if (!isCreated){
                console.log('Creating Database')
                await User.createTableUsers()
                await Configuration.createTableConfiguration()
                await Configuration.insertIntoConfiguration([{key:"serverAddress", state:"127.0.0.1:9898"}])
                await Area.createTableAreas()
                await Asset.createTableAssets()
                await Inventory.createTableInventaires()
                await Detail.createTableDetails()
                console.log('Database created')
            }
            return(true)
        }
        catch(err){ console.log('Problem creating Database') }
    }  

}