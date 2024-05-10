import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://ckrajantv:rajan%40123@cluster0.ckivzx4.mongodb.net/', {
});

export default mongoose.connection;

