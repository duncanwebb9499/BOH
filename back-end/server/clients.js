const clients = {
  getAll: (req, res) => {
    const pool = req.app.get('pool');
    const qryStr = `
      select *
      from public.client
      order by id asc limit 10
    `;

    pool.select(res, qryStr);
  },

  getById: (req, res) => {
    const pool = req.app.get('pool');
    const qryStr = `
      select *
      from public.client
      where id = $1
    `;
    const params = new Array(req.params.id);

    pool.selectOne(res, qryStr, params, 'client');
  },

  getStatusCodes: (req, res) => {
    const pool = req.app.get('pool');
    const qryStr = `
      select id,
        name
      from public.status_source
      order by sort_order
    `;

    pool.select(res, qryStr);
  }
};

module.exports = clients;
