const getTableData = (req, res, db) => {
    db.raw(`
      select
        l.lead_date, l.stock_name , f.sector , f.company , sl.percentage_change, sl.start_date,
        sl.end_date, sl.end_date - sl.start_date as duration,
        sl.start_date - l.lead_date as lagging, sl.end_date - l.lead_date as actual, sl.lead_percentage_change
      from
        stocktrader.leads l
      left join stocktrader.fortune_1000 f
      on
        l.stock_name = f.ticker
      left join stocktrader.stocks_leads sl
      on
        l.id = sl.lead_id
      where l.lead_date > '2023-7-1'
      and l.lead_date <= '2023-8-31'
    `)
      .then(items => {
        if(items.length){
          res.json(items)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  module.exports = {
    getTableData
  }
  
