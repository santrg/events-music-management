import mysql from 'serverless-mysql'

export const conn =  mysql({
  config: {
    host     : process.env.ENDPOINT,
    database : process.env.DATABASE, 
    user     : process.env.USER, 
    password : process.env.PASSWORD, 
    port: 3306
  }

})

