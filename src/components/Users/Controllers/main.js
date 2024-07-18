const getTableData = (req, res, db) => {
  db.select('*').from('stocktrader.leads')
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const postTableData = (req, res, db) => {
  const { id, stock_name, lead_date, sealing_flag, sealing_price, lead_price, active_flag} = req.body
  const added = new Date()
  db('stocktrader.leads').insert({id, stock_name, lead_date, sealing_flag, sealing_price, lead_price, active_flag, added})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const putTableData = (req, res, db) => {
  const { id, stock_name, lead_date, sealing_flag, sealing_price, lead_price, active_flag} = req.body
  db('stocktrader.leads').where({id}).update({id, stock_name, lead_date, sealing_flag, sealing_price, lead_price, active_flag})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteTableData = (req, res, db) => {
  const { id } = req.body
  db('stocktrader.leads').where({id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData
}