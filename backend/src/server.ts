import * as express from "express"
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import "./shared/container";

const cors = require("cors");
import profileRoutes from "./routes/profileRoutes";
import stateRoutes from "./routes/stateRoutes";
import cityRoutes from "./routes/cityRoutes";
import districtRoutes from "./routes/districtRoutes";
import addressRoutes from "./routes/addressRoutes";
import userRoutes from "./routes/userRoutes";
import barberShopRoutes from "./routes/barberShopRoutes";
import serviceRoutes from "./routes/serviceRoutes";
import barberRoutes from "./routes/barberRoutes";
import scheduleRoutes from "./routes/scheduleRoutes";
import scheduleTimeRoutes from "./routes/scheduleTimeRoutes";

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin");
  next();
})

// create express app
app.use(bodyParser.json());
app.use(profileRoutes);
app.use(stateRoutes);
app.use(cityRoutes);
app.use(districtRoutes);
app.use(addressRoutes);
app.use(userRoutes);
app.use(barberShopRoutes);
app.use(serviceRoutes);
app.use(barberRoutes);
app.use(scheduleRoutes);
app.use(scheduleTimeRoutes);
app.use(cors);

app.use((err, res, next) => {
  console.log(JSON.stringify(err));

  if (!err) {
    next();
  }

  res.status(500).send(err);
});

// start express server
app.listen(process.env.PORT);
console.log(`Express server has started on port ${process.env.PORT}.`);

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected");
  })
  .catch((error) => console.log(error));
