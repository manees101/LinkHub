import path from "path";
import multer from "multer";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from "fs"
// ====================== Image API Controllers ========================

//upload Image 
const uploadImage=async(req,res)=>{
    try
    { 
       const storage=multer.diskStorage({
        destination:(req,image,cb)=>{
            cb(null,"public/images")
        },
        filename:(req,image,cb)=>{
            cb(null,req.body.name)
        }
       });
       const upload = multer({ storage: storage }).single("image"); 
       upload(req, res, (err) => {
           if (err instanceof multer.MulterError) {
               // A Multer error occurred during the file upload
               return res.status(500).json({ success: false, msg: "Multer Error", error: err });
           } else if (err) {
               // An unknown error occurred
               return res.status(500).json({ success: false, msg: "Unknown Error", error: err });
           }
           // File upload was successful
           return res.status(200).json({ success: true, msg: "File uploaded successfully" });
        });

    }
    catch(err)
    {
        res.status(500).json({success:false,msg:"Internal Server error"})
    }
}

//Get image by name
const getImage=async(req,res)=>{
    try
    {
       const {imageName}=req.params
       const imagePath=path.join(__dirname,"../public/images",imageName)
       res.sendFile(imagePath,(error)=>{
        if(error)
        {
            console.error('Error sending the image:', error);
            res.status(404).send('Image not found');
        }
       })
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({success:false,msg:err})
    }
}
const deleteImage = (req, res) => {
    try {
      const imageName = req.params.imageName; // Assuming the image name is sent as a parameter
  
      // Path to the directory where images are stored
      const imagePath = path.join(__dirname, 'public', 'images', imageName);
  
      // Check if the file exists
      if (fs.existsSync(imagePath)) {
        // Delete the file
        fs.unlinkSync(imagePath);
        res.status(200).json({ success: true, message: 'Image deleted successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Image not found' });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: 'Internal Server Error', error: err });
    }
  };
export {uploadImage,getImage,deleteImage}