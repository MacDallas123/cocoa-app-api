const express = require('express');
const authRoutes = require('./routes/auth');
const userRoutes = require("./routes/users");
const cooperativeRoutes = require("./routes/cooperative");
const exporterRoutes = require("./routes/exporter");
const purchaseRoutes = require("./routes/purchase");
const saleRoutes = require("./routes/sale");
const plotRoutes = require("./routes/plot");
const db = require("./db");
const sequelize = require("./sequelize");
const { importDatas } = require('./import_xlsx');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// create App Database if not exists
db.createDb("cacaoapp");

// Synchroniser les modèles avec la base de données
sequelize.sync({force: true})
.then(async () => {
  console.log("Les tables ont été synchronisées");
  await importDatas();
})
.catch((err) => console.log("Erreur : " + err));

// Importer les données excels

// Start of any route
let routeHead = "/api/v1";

// Routes
app.use(`${routeHead}/auth`, authRoutes);

app.use(`${routeHead}/users`, userRoutes);

//app.use(`${routeHead}/producers`, producerRoutes);

app.use(`${routeHead}/cooperatives`, cooperativeRoutes);

app.use(`${routeHead}/exporter`, exporterRoutes);

app.use(`${routeHead}/purchases`, purchaseRoutes);

app.use(`${routeHead}/sales`, saleRoutes);

app.use(`${routeHead}/plots`, plotRoutes);

app.listen(port, () => {
  console.log(`L'API est disponible via http://localhost:${port}`);
});