import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggerService } from './log.service';
import { DatabaseTableName } from '../enum';
import { DatabaseStructure } from '../../lib/db/db-structure';

@Injectable({
    providedIn: 'root',
})
export class DatabaseService {
    private database: SQLiteObject;
    private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(
        private sqlite: SQLite,
        private logger: LoggerService,
    ) {
        // Create SQLite database
        this.sqlite.create({
            name: 'partyCrasherDB.db',
            location: 'default'
        })
            .then((db: SQLiteObject) => {      
                this.database = db;
                this.dbReady.next(true);
            })
            .catch(e => this.logger.error(e));
    }

    public getDatabaseReadyState(): Observable<boolean> {
        return this.dbReady.asObservable();
    }

    private initDatabaseTable(tableName: DatabaseTableName): Observable<void> {
        return new Observable((observer) => {
            // Wait until database is ready
            const databaseSubscription = this.getDatabaseReadyState().subscribe((ready: boolean) => {
                if (!ready) {
                    return;
                }
                
                // Create table if it does not exist yet
                this.database.executeSql(`CREATE TABLE IF NOT EXISTS ${tableName} (${DatabaseStructure[tableName]})`, [])
                    .then(() => {
                        observer.next();
                    })
                    .catch(e => {
                        this.logger.error(e);
                        observer.error();
                    });

                // Clean up subscription when done
                if (typeof databaseSubscription !== 'undefined') {
                    databaseSubscription.unsubscribe();
                }
            });
        });
    }

    public getRows(tableName: DatabaseTableName): Observable<any[]> {
        return new Observable((observer) => {
            // Wait for table to be ready
            const tableSubscription = this.initDatabaseTable(tableName).subscribe(() => {
                this.database.executeSql(`SELECT * FROM ${tableName}`, [])
                    .then((res) => {
                        observer.next(res);
                    })
                    .catch(e => {
                        this.logger.error(e);
                        observer.error();
                    });

                // Clean up subscription when done
                if (typeof tableSubscription !== 'undefined') {
                    tableSubscription.unsubscribe();
                }
            });
        });
    }

    public insertRow(tableName: DatabaseTableName, values: {[key: string]: any}): Observable<void> {
        return new Observable((observer) => {
            // Wait for table to be ready
            const tableSubscription = this.initDatabaseTable(tableName).subscribe(() => {
                this.database.executeSql(`INSERT INTO ${tableName} (${Object.keys(values).join()}) VALUES (${Object.values(values).join()})`, [])
                    .then(() => {
                        observer.next();
                    })
                    .catch(e => {
                        this.logger.error(e);
                        observer.error();
                    });

                // Clean up subscription when done
                if (typeof tableSubscription !== 'undefined') {
                    tableSubscription.unsubscribe();
                }
            });
        });
    }

    public updateRow(tableName: DatabaseTableName, values: {[key: string]: any}, id: string | number): Observable<void> {
        return new Observable((observer) => {
            // Wait for table to be ready
            const tableSubscription = this.initDatabaseTable(tableName).subscribe(() => {
                let query = `UPDATE ${tableName} SET`;
                Object.keys(values).forEach((key, i) => {
                    query += ` ${key} = ${values[key]}`;
                    if (i !== (Object.keys(values).length - 1)) {
                        query += ',';
                    }
                });
                query += `WHERE id = ${id}`;

                this.database.executeSql(query, [])
                    .then(() => {
                        observer.next();
                    })
                    .catch(e => {
                        this.logger.error(e);
                        observer.error();
                    });

                // Clean up subscription when done
                if (typeof tableSubscription !== 'undefined') {
                    tableSubscription.unsubscribe();
                }
            });
        });
    }

    public deleteRow(tableName: DatabaseTableName, id: string | number): Observable<void> {
        return new Observable((observer) => {
            // Wait for table to be ready
            const tableSubscription = this.initDatabaseTable(tableName).subscribe(() => {
                this.database.executeSql(`DELETE FROM ${tableName} WHERE id = ${id}`, [])
                    .then(() => {
                        observer.next();
                    })
                    .catch(e => {
                        this.logger.error(e);
                        observer.error();
                    });

                // Clean up subscription when done
                if (typeof tableSubscription !== 'undefined') {
                    tableSubscription.unsubscribe();
                }
            });
        });
    }
}