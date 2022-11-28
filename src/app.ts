import 'reflect-metadata';
import * as express from "express"
import { Request, Response } from "express"
import { myDataSource } from "./app-data-source"
import { User } from "./entity/user.entity"

// establish database connection
myDataSource
  .initialize()
  .then(() => {
    console.log("dataSource has been initialized!")
  })
  .catch((err) => {
    console.error("Error during dataSource init: ", err)
  })

// create app & set up express
const app = express()
app.use(express.json())

app.get('/', function(req: Request, res: Response){
  console.log('get /')
  res.send('Hello!')
})

// register routes
app.get("/users", function(req: Request, res: Response) {
  const users = myDataSource.getRepository(User).find();
  res.json(users)
})

app.get("/users/:id", async function(req: Request, res: Response) {
  const results = await myDataSource.getRepository(User).findOneBy({
    id: parseInt(req.params.id),
  });
  return res.send(results);
})

app.post("/users", async function (req: Request, res: Response) {
  const user = await myDataSource.getRepository(User).create(req.body);
  const results = await myDataSource.getRepository(User).save(user);
  return res.send(results);
})

app.put('/users/:id', async function (req: Request, res: Response) {
  const user = await myDataSource.getRepository(User).findOneBy({
    id: parseInt(req.params.id),
  });
  myDataSource.getRepository(User).merge(user, req.body);
  const results = await myDataSource.getRepository(User).save(user);
  return res.send(results);
});

app.delete('/users/:id', async function (req: Request, res: Response) {
  const results = await myDataSource.getRepository(User).delete(req.params.id);
  return res.send(results);
});

console.log("app running at port 3000")
app.listen(3000)