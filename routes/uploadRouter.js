import express from 'express'
import path from 'path'
import multer from 'multer'

const uploadRouter = express.Router()

//Storage engine
const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')  //'root_folder/uploads/'
    },
    filename(req, file, cb){  //naming the file
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`) //e.g. image-23232323.png

    }
})

//file validation
//prevent uploading other script files
function checkFileType(file, cb){
    const filetypes = /jpg|jpeg|png|webp/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null, true)
    }else{
        cb(new Error('Images only! (jpg, jpeg, png, webp)'))
    }
}

//initialize Multer
const upload = multer({
    storage,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    } 
})

//the route
uploadRouter.post('/', upload.single('image'), (req,res)=>{
    try{
        if(!req.file){
            res.status(400).json({message: "No file uploaded"})
            return
        }
          //return the file path to frontend
          res.send({
            message: "File uploaded successfully",
            imagePath: '/${req.file.path.replace(/\\/g, '/')}'
          })  
    }catch(error){
        res.status(500).json({message: "File upload failed"})
    }
})

export default uploadRouter