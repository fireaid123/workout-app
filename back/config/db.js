import mongoose from 'mongoose';

export const connectDB = async () => {
   try {
      // в try мы пишем все что у нас происходит если ошибки нет
      const conn = await mongoose.connect(process.env.MONGO_URI,{
         useUnifiedTopology: true,
         useNewUrlParser: true,
      })

      console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
   } catch (error) {
      // Если ошибка есть то что мы будем делать дальше
      console.log(`Error: ${error.message}`.red.underline.bold)
      process.exit(1)
   }
};
