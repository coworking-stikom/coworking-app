import { db } from '../../models/dbConfig'
import users from '../../models/users'
export default function handler(req, res) {
  users
  db.sync({ force: false, alter: true })
  res.end('ok')
}
