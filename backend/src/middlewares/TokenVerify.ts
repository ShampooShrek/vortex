import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

const TokenVerify = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1]

  if (!token) return res.status(401).json({ type: "error", response: "Sem Token" })

  try {
    verify(token, `${process.env.JWT_KEY}`, (err, value) => {
      if (err) return res.status(401).json({ type: "error", response: "Token invalido" })

      if (value) {
        req.body.token = value;
        next();
      }
    })
  } catch (err) {
    return res.status(401).json({ type: "error", response: "Sem autorização!" })
  }
}

export const TokenOptional = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1]
  try {
    if (token) {
      verify(token, `${process.env.JWT_KEY}`, (err, value) => {
        if (err) {
          req.body.token = null
          next()
        }

        if (value) {
          req.body.token = value;
          next()
        }
      })
    } else {
      req.body.token = null
      next()
    }
  } catch (err) {
    return res.status(401).json({ type: "error", response: "Sem autorização!" })
  }
}

export default TokenVerify
