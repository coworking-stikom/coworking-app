// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { service } from '../../helper'
export default function handler(req, res) {
  const { method, body } = req
  if (method === 'POST') {
    return service.users
      .signup(body)
      .then((it) => {
        res.status(201).json(it)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).end('failed to signin')
      })
  } else {
    return res.end()
  }
}
