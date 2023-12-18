import 'dotenv/config'
import express from 'express';
import morgan from 'morgan';
import cors from 'cors' 
import db from './config/dbConnect.js'
import expressMongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean'
import searchRouter from './routes/searchRoute.js'
import adminRouter from './routes/adminRoute.js'
const app = express();

app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use( 
  cors({
    origin : ["http://localhost:3000"],
    methods : ["GET","POST" , "DELETE" ,"PUT" , "PATCH"] ,
    credentials: true  
  })
);

app.use(expressMongoSanitize());
app.use(xss());
app.use('/',searchRouter)
app.use('/admin',adminRouter )

db();

let PORT = 2000
app.listen(PORT,()=>console.log('server is running on http://localhost:2000'))

export { app }    
