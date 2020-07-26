import { DatabaseTableName } from "../../shared/enum"

export const DatabaseStructure: {[key: string]: string} = {
    [DatabaseTableName.FRIENDS]: 'id INTEGER PRIMARY KEY, firstName VARCHAR(255), middleName VARCHAR(255), lastName VARCHAR(255)',
    [DatabaseTableName.CHALLENGES]: 'id INTEGER PRIMARY KEY, title VARCHAR(255), description TEXT',
}