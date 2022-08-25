import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
   {
      // Описываем модель что у нас будет в самом User
      // В данном случае у нас все простенько поэтому какойто визуальной схемы писать не будем, просто опишем что у нас будет
      name: String,
      password: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      images: {
         before: String,
         after: String,
      }
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

// Мы создаем метод котрый называется matchPassword мы будем использовать потом в контроллере, опять же асинхронная функция принимает в себя введенынй пароль и возвращает , берем шифратор (bcrypt), compare - сравнивает, то есть сравниваем введеный пароль и текущий пароль. То есть он у себя расшифровывает и там и сравнивает правильное ли шифрование или нет.
userSchema.methods.matchPassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password)
}

// Дальше перед сохранением (pre - перед, save - сохранение) асинхронная функция с параметром next (next - пропускает действие, идет дальше). Если не измененный пароль то мы идем дальше. КРч если пароль не поменяли идем дальше , если его поменяли то #
userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) {
      next()
   }

   // # опять шифруем (genSalt - генерирует десятизначную строчку грубо говоря) и в текущий пароль который у нас на руках грубо говоря мы в него записываем в него всю эту историю(await bcrypt.hash(this.password, salt) мы его хэшируем и записываем.
   const salt = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password, salt)
})

// Все это нужно чтобы пароль хранился комфортно и все с ним было хорошо
// Дальше
// В моделе пишем User это как мы будем обращаться из других мест к этой модели конкретно и сюда передаем схему.
const User = mongoose.model('User', userSchema)

export default User