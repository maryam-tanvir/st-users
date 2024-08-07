const express = require('express')

// use process.env variables to keep private variables,
require('dotenv').config()

// Express Middleware
// const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests


// db Connection w/ localhost
var db = require('knex')({
  client: 'pg',
  connection: {
    host : 'sthub.c3uguk04fjqb.ap-southeast-2.rds.amazonaws.com',
    user : 'stpostgres',
    password : 'stocktrader',
    database : 'postgres'
  }
});

// Controllers - aka, the db queries
const main = require('./src/components/DataVisualization/Controllers/main')

// App
const app = express()


// app.use(helmet())
app.use(cors({
  credentials:true,
  origin:["http://localhost:3000"]
}))
app.use(bodyParser.json())
app.use(morgan('combined')) // use 'tiny' or 'combined'

// App Routes - Auth

app.get('/crud', (req, res) => main.getTableData(req, res, db))
app.get('/crudd', (req, res) => main.getTableData2(req, res, db))
app.post('/crud', (req, res) => main.postTableData(req, res, db))
app.put('/crud', (req, res) => main.putTableData(req, res, db))
app.delete('/crud', (req, res) => main.deleteTableData(req, res, db))

app.get('/api/data', async (req, res) => {
  try {
    const query = `
      SELECT 
        p.performance_id,
        p.unit_assignment_id,
        p.profit_and_loss,
        p.battle_date,
        p.lead_id,
        p.percentageprofitandloss,
        d.start_date,
        d.end_date,
        d.status
      FROM 
        war.performance p
      LEFT JOIN 
        war.deployment d ON p.unit_assignment_id = d.unit_assignment_id
      LEFT JOIN 
        war.allocation a ON d.deployment_id = a.deployment_id
    `;

      const data = await db.raw(query);

      const formattedData = data.rows.map(row => ({
          performance_id: row.performance_id,
          unit_assignment_id: row.unit_assignment_id,
          profit_and_loss: row.profit_and_loss,
          battle_date: row.battle_date,
          lead_id: row.lead_id,
          percentageprofitandloss: row.percentageprofitandloss,
          start_date: row.start_date,
          end_date: row.end_date,
          status: row.status,
          quadrant: row.lead_id,
          color: row.profit_and_loss >= 0 ? 'green' : 'red'
      }));

      res.json(formattedData);
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// App server connection
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
