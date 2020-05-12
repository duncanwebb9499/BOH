const caseWorker = {
    
    getCompaniesByID: (req, res) =>{
      const pool = req.app.get('pool');
      const qryStr = `
      select
        name,
        primary_first_name,
        primary_last_name,
        primary_phone,
        primary_email,
        address1,
        city,
        state,
        zip_code,
        neighborhood_id
        from public.company
      where id = $1
      `;
      const params = new Array(req.params.id);
      pool.selectOne(res, qryStr, params, 'company');
    }, 
    
    getAllCompanies: (req, res) => {
      const pool = req.app.get('pool');
      const qryStr = `
        select id,
        name,
        primary_first_name,
        primary_last_name,
        primary_phone,
        primary_email,
        address1,
        city,
        state,
        zip_code,
        neighborhood_id
        from public.company
        order by id asc 
      `;
  
      pool.select(res, qryStr);
    },
    insertNewCompany:(req, res) => {
      const pool = req.app.get('pool');
      const qryStr = `
        insert into public.company (
          name,
          primary_first_name,
          primary_last_name,
          primary_phone,
          primary_email,
          address1,
          city,
          state,
          zip_code,
          date_created,
          created_by,
          last_updated,
          updated_by
        ) values (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          current_timestamp,
          $10,
          current_timestamp,
          $10
        )
      `;
      const params = new Array(
        req.body.name,
        req.body.primary_first_name,
        req.body.primary_last_name,
        req.body.primary_phone,
        req.body.primary_email,
        req.body.address1,
        req.body.city,
        req.body.state,
        req.body.zip_code,
        req.params.id,
      );
      pool.insert(res,qryStr,params);
    },
    updateCompany: (req, res) => {
      const pool = req.app.get('pool');
      const qryStr = `
        update public.company
        set name = $2,
          primary_first_name = $3,
          primary_last_name = $4,
          primary_phone = $5,
          primary_email = $6,
          address1 = $7,
          city = $8,
          state = $9,
          zip_code = $10,
          neighborhood_id = $11
        where id = $1
      `;
      const params = new Array(
        req.params.id,
        req.body.name,
        req.body.primary_first_name,
        req.body.primary_last_name,
        req.body.primary_phone,
        req.body.primary_email,
        req.body.address,
        req.body.city,
        req.body.state,
        req.body.zip_code,
        req.body.neighborhood_id
      );
      pool.update(res, qryStr, params);
    },

    getClientByID: (req, res) =>{
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
          order by id asc 
        `;
        pool.select(res, qryStr);
    },
    insertNewClient:(req, res) => {
      const pool = req.app.get('pool');
      const qryStr = `
        insert into public.client (
          first_name,
          last_name,
          sex,
          lph_resident,
          owns_car,
          has_license,
          ride_available,
          status_id,
          date_created,
          created_by,
          last_updated,
          updated_by
        ) values (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          current_timestamp,
          $9,
          current_timestamp,
          $9
        )
      `;
      const params = new Array(
        req.body.first_name,
        req.body.last_name,
        req.body.sex,
        req.body.lph_resident,
        req.body.owns_car,
        req.body.has_license,
        req.body.ride_available,
        req.body.status_id,
        req.params.id,
      );
      pool.insert(res,qryStr,params);
    },

    updateClient: (req, res) => {
      const pool = req.app.get('pool');
      const qryStr = `
        update public.client
        set first_name = $2,
          last_name = $3,
          status_id = $4,
          phone_number = $5
        where id = $1
      `;
      const params = new Array(
        req.params.id,
        req.body.first_name,
        req.body.last_name,
        req.body.status_id || null,
        req.body.phone_number
      );
      
      pool.update(res, qryStr, params);
    },
  };
  
  
  module.exports = caseWorker;