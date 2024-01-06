import axios from "axios";
const imageAPI=axios.create()
import {Client,Storage} from "appwrite"
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('659595434f9580f153b6');

    const storage = new Storage(client);

imageAPI.uploadImage=async(image,fileName)=>{
    try
    {
     console.log(fileName.length)
      const result= await storage.createFile(
        '659596c882c74367b729',
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
      '659596c882c74367b729',
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

    return await storage.deleteFile("659596c882c74367b729",fileName)
  }
  catch(err)
  {
    console.log(err)
  }
}
export default imageAPI