import mysql = require ('mysql');

export default class MySQL{
    private static _instance:MySQL;
    cnn: mysql.Connection;
    conectado:boolean=false;

    constructor (){
        console.log('Clase inicializada');
        this.cnn = mysql.createConnection({
            host:'localhost',
            user:'node_user',
            password:'123456',
            database:'node_db'

        });
        this.conectarDB();
    }

    public static get instance(){
        return this._instance || (this._instance = new this());
    };

    static ejecutarQuery(query:string,callback:Function){
        this.instance.cnn.query(query,(err, results:Object[],fields)=>{
            if (err){
                console.log('Error en query');
                console.log(err);
                return callback(err)
            }
            if (results.length === 0){
                callback('El registro solicitado no existe');
            }else{
            callback(null, results);    
            }
            
        })
    }


    private conectarDB(){
        this.cnn.connect((err:mysql.MysqlError)=>{
            if (err){
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('Base de datos Online');
        })
    }
}

/*
import mysql = require('mysql');
 
 
export default class MySQL{
 
    private static _instance: MySQL;
 
    conection: mysql.Connection;
    conectado: boolean = false;
 
    constructor(){
        // Solo debe aparecer una vez este mensaje, ya que usamos el Singleton
        console.log('Clase inicializada');
 
        // this.conectarDB();
        this.manejoDeConexion();
    }
 
    public static get instance(){
        return this._instance || ( this._instance = new this() );
    }
 
    static ejecutarQuery( query: string, callback: Function ){
        
        this.instance.conection.query(query, (err, results: Object[] , fields) => {
            if(err){
                console.log('Error en query ', err);
                return callback(err);
            }
 
            if(results.length === 0){
                callback('El registro solicitado no existe');
            }else{
                callback(null, results );
            }
 
        });
    }
 
    private manejoDeConexion(){
        this.conectarDB();
    }
 
    private conectarDB(){
 
        this.conection = mysql.createConnection({
            host: 'XXX.XXX.XX.XX || localhost',
            user: 'userNameDB',
            password: 'passwordDB',
            database: 'DBName'
        });
 
 
        this.conection.connect( (err) => {
            if(err){
                console.log('Error cuando conectamos a la BD: ',err);
                setTimeout(this.manejoDeConexion, 2000);
            }
            this.conectado = true;
            console.log('Base de datos ONLINE');
        });
 
        this.conection.on('error', (err) => {
            console.log('Reconectando a Base de datos');
            if (err.code === 'PROTOCOL_CONNECTION_LOST'){
                this.manejoDeConexion();
            }else {
                throw err;
            }
        });
    }
 
}
*/

//Hola chicos, realice esta implemantacion que encontre en "https://stackoverflow.com/questions/20210522/nodejs-mysql-error-connection-lost-the-server-closed-the-connection", si tengo algun error en ella agradezco ayuda y lograr una solución que todos podamos utilizar. Saludos//