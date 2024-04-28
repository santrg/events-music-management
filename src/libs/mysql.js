 import mysql from 'serverless-mysql'

export const conn =   mysql({
  config: {
    host     : process.env.DB_ENDPOINT,
    database : process.env.DB_DATABASE, 
    user     : process.env.DB_USER, 
    password : process.env.DB_PASSWORD, 
    port     : process.env.DB_PORT
  },
})


