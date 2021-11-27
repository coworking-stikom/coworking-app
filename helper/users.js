import users from '../models/users'
import { myPassword } from './lib'
class UserService {
  async signup(data) {
    try {
      const encrypt = await myPassword.encryptPass(data.password)
      const it = await users.create({ ...data, ...{ password: encrypt } })
      return it
    } catch (error) {
      throw error
    }
  }

  //function user already register
  async checkUser(condition) {
    return new Promise((resolve, reject) => {
      users.findOne({ where: condition }).then((user) => {
        if (user) {
          return resolve(user)
        }
        return reject({ code: 403, message: 'user not registered' })
      })
    })
  }

  async signin(data) {
    try {
      const user = await this.checkUser({ email: data.email })
      const correctPassword = await myPassword.decryptPass(
        data.password,
        user.password
      )
      if (!correctPassword) {
        throw { message: 'Invalid password' }
      }
      // const it = await users.create({ ...data, ...{ password: encrypt } })
      return user
    } catch (error) {
      throw error
    }
  }
}

export default new UserService()
