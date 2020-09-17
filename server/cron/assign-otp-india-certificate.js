var pg = require('pg');
const { Pool, Client } = require('pg');
var config = require('./../config/config');
const pool = new Pool({
  connectionString: config.connectionString
});


(async () => {

  const start = Date.now();
  const client = await pool.connect();

  try {


    sql = `update trees set certificate_id = 154 where planter_id IN (1953,1955,1958) and certificate_id is null`;
    query = {
      text: sql,
    };
    console.log(query);

    await client.query(query);

    client.release();
    pool.end();

  } catch (e) {
    console.log(e)
    client.release();
    pool.end();
    throw e
  } finally {
    const end = Date.now();
    console.log(start);
    console.log(end);
    console.log('DONE');
  }


})().catch(e => console.error(e.stack))
