const caseWorker = {
    
    getCompaniesById: (req, res) =>{
      const pool = req.app.get('pool');
      const qryStr = `
      select name,
        primary_first_name,
        primary_last_name,
        primary_email,
        primary_phone
        from public.company
      where id = $1
      `;

      pool.select(res, qryStr);
    }, 
    
    getAllCompanies: (req, res) => {
      const pool = req.app.get('pool');
      const qryStr = `
        select name,
        primary_first_name,
        primary_last_name,
        primary_email,
        primary_phone
        from public.company
        order by id asc limit 3
      `;
  
      pool.select(res, qryStr);
    },

    getClientById: (req, res) =>{
      const pool = req.app.get('pool');
      const qryStr = `
      select last_name,
      first_name,
      phone_number,
      status_id,
      id
      from public.client
      where id = $1
      `;
      const params = new Array(req.params.id);
      pool.selectOne(res, qryStr, params, 'client');
    },
  
    getAllClients: (req, res) => {
        const pool = req.app.get('pool');
        const qryStr = `
          select first_name,
          last_name,
          phone_number,
          status_id,
          id
          from public.client
          order by id asc limit 3
        `;
        pool.select(res, qryStr);
    },

    update: (req, res) => {
      const pool = req.app.get('pool');
      const qryStr = `
        update public.client
        set first_name = $2,
          last_name = $3,
          status_id = $4,
          phone_number = $5
        where id = $1
      `;
      const params = new Array(req.body);
      pool.update(res, qryStr, params);
    }
  };
  
  
  module.exports = caseWorker;