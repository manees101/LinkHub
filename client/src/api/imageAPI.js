import axios from "axios";
const imageAPI=axios.create()
import {Client,Storage} from "appwrite"
const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

    const storage = new Storage(client);

imageAPI.uploadImage=async(image,fileName)=>{
    try
    {
     console.log(fileName.length)
      const result= await storage.createFile(
        import.meta.env.VITE_APPWRITE_BUCKET_ID,
        fileName,
        image
    );
    console.log(result)
    }
    catch(err)
    {
      console.log(err)
    }
}
imageAPI.getImage=async(imageName)=>{
    try
    {
      console.log(imageName)
     const response= storage.getFilePreview(
      import.meta.env.VITE_APPWRITE_BUCKET_ID,
      imageName.split(".")[0],
     )
    return response;
    }
    catch(err)
    {
      console.log(err)
    }
}
imageAPI.deleteImage=async(fileName)=>{
  try
  {

    return await storage.deleteFile( import.meta.env.VITE_APPWRITE_BUCKET_ID,fileName)
  }
  catch(err)
  {
    console.log(err)
  }
}
export default imageAPI