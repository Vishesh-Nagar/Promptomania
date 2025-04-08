import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    // mongoose.SchemaTypes('strictQuery', true);  <-------------- mongoose.SchemaTypes is not a function in Mongoose

    if (isConnected) {
        console.log('MongoDB is already connected');
        return; // to stop if it's running
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share-prompt",
            // useNewUrlParser: true,         <-------------- deprecated  
            // useUnifiedTopology: true,       <-------------- deprecated
        });

        isConnected = true;

        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
}
