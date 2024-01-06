import mongoose from "mongoose"
import "colors"
async function connect(DB_URL)
{
    try
    {
      await mongoose.connect(DB_URL)
        console.log(`Connected to DB successfully`.blue.bold)
    }
    catch(err)
    {
        console.log(`${err}`.red.bold)
    }
}

export default connect