import { hash, compare } from 'bcrypt'

const salt = 12

export const myPassword = class {
  static encryptPass(value) {
    return new Promise((resolve, reject) => {
      hash(value, salt, (err, result) => {
        if (err) reject(err)
        return resolve(result)
      })
    })
  }

  static decryptPass(inputPass, oldPassword) {
    return new Promise((resolve, reject) => {
      compare(inputPass, oldPassword, (err, isMatch) => {
        if (err) reject(err)
        resolve(isMatch)
      })
    })
  }
}
