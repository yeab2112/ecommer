
import express from 'express'
import cors from 'cors'
import { router } from "./route/user.js" 
 import './config/db.js'
const app = express();
 app.use(cors())
app.use(express.json());
app.use('/api',router)
app.listen(process.env.PORT, () => {
console.log("Server listening at http:localhost: ${PORT}");
});
