import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema

const workoutLogSchema = mongoose.Schema(
   {
      // Описываем модель что у нас будет в самом User
      // В данном случае у нас все простенько поэтому какойто визуальной схемы писать не будем, просто опишем что у нас будет
      user: {
         type: ObjectId,
         ref: 'User',
         required: true
      },
      workout: { type: ObjectId, ref: 'Workout', required: true },
      completed: { type: Boolean, default: false },
      exerciseLogs: [
         {
            type: ObjectId,
            ref: 'ExerciseLog',
         },
      ],
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

const WorkoutLog = mongoose.model('WorkoutLog', workoutLogSchema)

export default WorkoutLog