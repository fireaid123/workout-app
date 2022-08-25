import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const protect = asyncHandler(async(req, res, next) => {
   let token

   if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)

      const userFound = await User.findById(decoded.userId).select('-password') // выбираем все кроме пароля, пароль нам не потребуется поэтому пишем select('-password') селект позволяет нам выбирать что-то допустим мы сейчас не берем password если мы ставим минус значит мы убираем это поле и оно нам не будет возвращено если написить без минуса password то мы получим только аддресс

      if (userFound) {
         req.user = userFound
         next() // елси нужно идти дальше пишем next()
      } else {
         res.status // - если ошибка пишем
         throw new Error('Не авторизован, токен не работает')
      }
   }

   if (!token) {
      res.status(401)
      throw new Error('Не авторизован, без токена')
   }
})

