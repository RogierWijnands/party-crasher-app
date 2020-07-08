import { DatabaseTableName } from "../../shared/enum"

export const DatabaseStructure: {[key: string]: string} = {
    [DatabaseTableName.FRIENDS]: 'id INTEGER PRIMARY KEY, firstName varchar(255), middleName varchar(255), lastName varchar(255)',
}