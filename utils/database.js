import mongoose from 'mongoose'

let isConnected = false; 

export const connectToDB = async ()=>{ 
    mongoose.set('strictQuery', true);

    if(isConnected){ 
        console.log('MongoDb is already connected'); 
        return;
    }

    try{ 
        await mongoose.connect(process.env.MONGODB_URI, { 
            dbName:'share_prompt', 
            serverSelectionTimeoutMS: 30000,  // Increase timeout
            socketTimeoutMS: 45000,
            useNewUrlParser:true,
            useUnifiedTopology: true,
        })

        isConnected = true;
        console.log('MongoDB connected')
    }
    catch(error){ 
        console.log('this is the error ' + error)
            console.log(error);
    }
}