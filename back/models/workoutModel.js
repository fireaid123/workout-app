import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema

const workoutSchema = mongoose.Schema(
   {
      // Описываем модель что у нас будет в самом User
      // В данном случае у нас все простенько поэтому какойто визуальной схемы писать не будем, просто опишем что у нас будет
      name: {type: String, required: true},
      exercises: [{
         type: ObjectId,
         ref: 'Exercise',
         req: true
      }],
      // Если бы проект был больше то писали бы так, но это еще можно посчитать что мы и сделаем
      // statistics: {
      //    minutes: {type: Number, default: 0},
      //    workouts: {type: Number, default: 0},
      //    kgs: {type: Number, default: 0},
      // }
   },
   {
      minimize: false, // Если у вас какой то объект условно address и когда вы будете искать address допустим то у некоторых юзеров может его просто не быть могут быть пустые поля и в таком случае если minimize будет ставить true как по дефолту то у нас address не будет возвращен никак то есть этого поля не будет существовать у юзера вообще 
      timestamps: true
   }
)

const Workout = mongoose.model('Workout', workoutSchema)

export default Workout