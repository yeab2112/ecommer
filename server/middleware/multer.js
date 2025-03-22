import  multer from "multer"
const storage=multer.diskStorage({
filename:function(req,file, callback){
    callback(file.originalname ,null)
}})
const upload=multer({storage})
export default upload