import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoggerService } from './log.service';
import { DatabaseTableName } from '../enum';
import { DatabaseStructure } from '../../lib/db/db-structure';
import { Platform } from '@ionic/angular';
import { browserDBInstance } from 'src/app/lib/db/browser-db-instance';
import { sql_escape } from 'src/app/lib/db/sql_escape';

@Injectable({
    providedIn: 'root',
})
export class DatabaseService {
    private readonly DB_NAME = 'partyCrasherDB';
    private database: SQLiteObject | {[key: string]: any}; // Cordova | browser based
    private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(
        private sqlite: SQLite,
        private logger: LoggerService,
        private platform: Platform,
    ) {
        this.init();
    }

    private async init() {
        // Create SQLite database
        if (!this.platform.is('cordova')) {
            // Browser based
            const db = (<any>window).openDatabase(this.DB_NAME, '1.0', 'DEV', 5 * 1024 * 1024);
            this.database = await browserDBInstance(db);
            this.dbReady.next(true);
        } else {
            // Cordova (native db)
            this.sqlite.create({
                name: this.DB_NAME,
                location: 'default'
            })
                .then((db: SQLiteObject) => {      
                    this.database = db;
                    this.dbReady.next(true);
                })
                .catch(e => this.logger.error(e));
        }
    }

    public getDatabaseReadyState(): Observable<boolean> {
        return this.dbReady.asObservable();
    }

    private initDatabaseTable(tableName: DatabaseTableName): Observable<void> {
        return new Observable((observer) => {
            // Wait until database is ready
            this.getDatabaseReadyState().subscribe((ready: boolean) => {
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
            });
        });
    }

    public getRows(tableName: DatabaseTableName): Observable<any[]> {
        return new Observable((observer) => {
            // Wait for table to be ready
            this.initDatabaseTable(tableName).subscribe(() => {
                this.database.executeSql(`SELECT * FROM ${tableName}`, [])
                    .then((res) => {
                        observer.next(res);
                    })
                    .catch(e => {
                        this.logger.error(e);
                        observer.error();
                    });
            });
        });
    }

    public insertRow(tableName: DatabaseTableName, values: {[key: string]: any}): Observable<void> {
        return new Observable((observer) => {
            // Wait for table to be ready
            this.initDatabaseTable(tableName).subscribe(() => {
                this.database.executeSql(`INSERT INTO ${tableName} (${Object.keys(values).join()}) VALUES (${Object.values(values).map(value => `'${sql_escape(value)}'`).join()})`, [])
                    .then(() => {
                        observer.next();
                    })
                    .catch(e => {
                        this.logger.error(e);
                        observer.error();
                    });
            });
        });
    }

    public updateRow(tableName: DatabaseTableName, values: {[key: string]: any}, id: string | number): Observable<void> {
        return new Observable((observer) => {
            // Wait for table to be ready
            this.initDatabaseTable(tableName).subscribe(() => {
                let query = `UPDATE ${tableName} SET`;
                Object.keys(values).forEach((key, i) => {
                    query += ` ${key} = '${sql_escape(values[key])}'`;
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
            });
        });
    }

    public deleteRow(tableName: DatabaseTableName, id: string | number): Observable<void> {
        return new Observable((observer) => {
            // Wait for table to be ready
            this.initDatabaseTable(tableName).subscribe(() => {
                this.database.executeSql(`DELETE FROM ${tableName} WHERE id = ${id}`, [])
                    .then(() => {
                        observer.next();
                    })
                    .catch(e => {
                        this.logger.error(e);
                        observer.error();
                    });
            });
        });
    }
}