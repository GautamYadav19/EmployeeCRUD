// const { resolve } = require("@angular/compiler-cli");

const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mysql@123",
  database: "mydatabase",
  connectionLimit: 10,
  port: 3306,
});
let rootdb = {};

rootdb.login = (username, password) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM users WHERE username = ? AND password = ?`,
      [username, password],
      (err, results) => {
        if (err) {
          return reject(err);
        } else if (!results.length) {
          console.log("else if  ", results);
          return resolve({ status: 0, data: [] });
        } else {
          console.log("hey ", results);
          let token = jwt.sign({ data: results }, "secret");
          const user = { status: 1, data: results, token: token };
          return resolve(user);
        }
      }
    );
  });
};
//

rootdb.registeration = (input) => {
  var sql = `Insert Into users (username, email, password) VALUES ( ?, ?, ? )`;
  console.log(input);
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT username FROM users WHERE username = ?`,
      [input.username],
      (err, results) => {
        if (err) {
          return reject({ status: 0, data: err });
        } else if (!results.length) {
          console.log("else if  ", results);
          pool.query(
            sql,
            [input.username, input.email, input.password],
            (err, result) => {
              if (err) {
                return reject({ status: 0, data: err });
              }
              let token = jwt.sign({ data: result }, "secret");
              return resolve({ status: 1, data: result, token: token });
            }
          );
        } else {
          console.log("else if  ", results);
          return resolve({ status: 0, data: "username already exist" });
        }
      }
    );
    // pool.query(

    //   sql,  [input.username, input.email, input.password], (err, result) => {
    //     if (err) {
    //       return reject(err);
    //     }
    //     return resolve(true);
    //   }
    // );
  }); //end
};
// rootdb.register = (input) => {
//   const checkUsername = `Select username FROM users WHERE username = ?`;
//   return new Promise((resolve, reject) => {
//   pool.query(checkUsername, [username], (err, result, fields) => {
//       if(!result.length){
//         const sql = `Insert Into users (username, email, password) VALUES ( ?, ?, ? )`
//         con.query(
//           sql, [username, email, hashed_password],
//         (err, result) =>{
//           if(err){
//             res.send({ status: 0, data: err });
//             return reject(err);
//           }
//           else{
//             let token = jwt.sign({ data: result }, 'secret')
//             res.send({ status: 1, data: result, token : token });
//           }

//         })
//       }
//     });

//
rootdb.employeelist = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `
    select e1.empid, j.job_title, e1.ename  ,  e2.ename as MgrName,e1.hiredate, e1.salary ,e1.comission,d.dname
    from employeetable e1 left join employeetable e2 on e1.mgrid = e2.empid
    inner join departments d on e1.deptid = d.deptid
    inner join jobs_table j on e1.jobid=j.job_id`,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

rootdb.employeejobs = () => {
  return new Promise((resolve, reject) => {
    pool.query(`select * from jobs_table`, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};
rootdb.employeejobname = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select * from employeetable inner join jobs_table
    on employeetable.jobid=jobs_table.job_id;`,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};
rootdb.employeemgr = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select * from employeetable where jobid ="mgr"`,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};
rootdb.locationID = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select locationid, concat(locationid," , " ,state, " , ",city) as location from location_table`,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};
rootdb.employeebyid = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select * from employeetable where empid = ?`, //isma a rahi hain problem bus baki sab theel hain
      [id],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

rootdb.departmentlist = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select departments.deptid,departments.dname,employeetable.ename,concat(locationid," , " ,state, " , ",city) as location from employeetable 
    inner join departments on departments.mgrid=employeetable.empid inner join location_table on departments.location_id=location_table.locationid;`,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

rootdb.departmentbyid = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select * from Departments where deptid = ?`,
      [id],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};

rootdb.empolyeeinsert = (input) => {
  var sql = `INSERT INTO  employeetable
            (
               empid,ename,jobid,mgrid,hiredate,salary,comission,deptid
            )
            VALUES
            (
                ?, ?, ?, ?, ?, ?,?,?
            )`;
  console.log(input);
  return new Promise((resolve, reject) => {
    pool.query(
      sql,
      [
        input.empid,
        input.ename,
        input.jobid,
        input.mgrid,
        input.hiredate,
        input.salary,
        input.comission,
        input.deptid,
      ],

      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(true);
      }
    );
  });
};

rootdb.departmentinsert = (inputdepartment) => {
  var sql = `insert into  Departments
    (
      deptid,dname,mgrid,location_id
    )
    values(
      ?,?,?,?
    )`;
  console.log(inputdepartment);

  return new Promise((resolve, reject) => {
    pool.query(
      sql,
      [
        inputdepartment.deptid,
        inputdepartment.dname,
        inputdepartment.mgrid,
        inputdepartment.location_id,
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(true);
      }
    );
  });
};

// rootdb.employeeupdate = (before, after) => {
//   var sql = `update employeetable
//   set empid = ?
//   where deptid = ?;`;
//  // console.log(input);
//   return new Promise((resolve, reject) => {
//     pool.query(
//       sql,
//       [before, after],

//       (err, result) => {
//         if (err) {
//           return reject(err);
//         }
//         return resolve(true);
//       }
//     );
//   });
// };

rootdb.deparmentupdate = (input) => {
  var sql = `update departments
  set deptid =?, 
  dname=?,
  mgrid =?,
  location_id=?
  where deptid= ?`;
  console.log(input);
  return new Promise((resolve, reject) => {
    pool.query(
      sql,
      [input.deptid, input.dname, input.mgrid, input.location_id, input.deptid],

      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(true);
      }
    );
    console.log(sql);
  });
};

rootdb.employeeupdate = (input) => {
  var sql = `update employeetable
  set ename =?, 
  jobid=?,
  mgrid =?,
  hiredate=?,
  salary =?,
  comission =?,
  deptid=?
  where empid= ?`;
  console.log(input);
  return new Promise((resolve, reject) => {
    pool.query(
      sql,
      [
        input.ename,
        input.jobid,
        input.mgrid,
        input.hiredate,
        input.salary,
        input.comission,
        input.deptid,
        input.empid,
      ],

      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(true);
      }
    );
  });
};

rootdb.departmentdelete = (id) => {
  var sql = `delete from departments
  where deptid=?`;
  // console.log(id);
  return new Promise((resolve, reject) => {
    pool.query(sql, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(true);
    });
  });
};
rootdb.employeedelete = (id) => {
  var sql = `delete from employeetable
  where empid=?`;
  // console.log(id);
  return new Promise((resolve, reject) => {
    pool.query(sql, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(true);
    });
  });
};
module.exports = rootdb;
