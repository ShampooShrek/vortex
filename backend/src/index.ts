import { serverHttp } from "./http"
import "./socket.ts"

const port = process.env.PORT || 3001

serverHttp.listen(port, () => {
  console.log(`Servidor  na ${port}`);
})
