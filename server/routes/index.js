const express = require("express");
const { async } = require("rxjs");
const db = require("../db");
const router = express.Router();

router.post("/login", async function (req, res, next) {
  try {
    let { username, password } = req.body;

    let results = await db.login(username, password); //ye hmare page se value kese lega?? ye yaad rekhna hain
    res.json(results);
    // wah se kya denge ki ye body mai isko padh lega
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});
/* GET users listing. */

router.post("/register", async (req, res, next) => {
  try {
    console.log(req);
    let results = await db.registeration(req.body);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendstatus(500);
  }
});
// router.post("/register", async function (req, res, next) {
//   try {
//     let { username, email, password } = req.body;

//     const hashed_password = md5(password.toString());
//     const checkUsername = `Select username FROM users WHERE username = ?`;
//     con.query(checkUsername, [username], (err, result, fields) => {
//       if (!result.length) {
//         const sql = `Insert Into users (username, email, password) VALUES ( ?, ?, ? )`;
//         con.query(
//           sql,
//           [username, email, hashed_password],
//           (err, result, fields) => {
//             if (err) {
//               res.send({ status: 0, data: err });
//             } else {
//               let token = jwt.sign({ data: result }, "secret");
//               res.send({ status: 1, data: result, token: token });
//             }
//           }
//         );
//       }
//     });
//   } catch (error) {
//     res.send({ status: 0, error: error });
//   }
// });
router.get("/employee", async (req, res, next) => {
  // res.json({ test: "test" });
  try {
    let results = await db.employeelist();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/employeejobs", async (req, res, next) => {
  // res.json({ test: "test" });
  try {
    let results = await db.employeejobs();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/employeemgr", async (req, res, next) => {
  // res.json({ test: "test" });
  try {
    let results = await db.employeemgr();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
router.get("/employeemgrname", async (req, res, next) => {
  // res.json({ test: "test" });
  try {
    let results = await db.employeejobname();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/locations", async (req, res, next) => {
  // res.json({ test: "test" });
  try {
    let results = await db.locationID();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
router.get("/employee/:id", async (req, res, next) => {
  try {
    // const { id } = req.params;
    let results = await db.employeebyid(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendstatus(500);
  }
});

router.get("/department", async (req, res, next) => {
  // res.json({ test: "test" });
  try {
    let results = await db.departmentlist();
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/department/:id", async (req, res, next) => {
  //id ka part hain add kara hua
  try {
    // const { id } = req.params;
    let results = await db.departmentbyid(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendstatus(500);
  }
});

router.post("/employeeinsert", async (req, res, next) => {
  try {
    //  console.log(req);
    let results = await db.empolyeeinsert(req.body);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendstatus(500);
  }
});

router.post("/departmentinsert", async (req, res, next) => {
  try {
    //  console.log(req);
    let results = await db.departmentinsert(req.body);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendstatus(500);
  }
});

router.put("/employeeupdate", async (req, res, next) => {
  try {
    // console.log(req);
    let results = await db.employeeupdate(req.body);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendstatus(500);
  }
});

router.put("/departmentupdate", async (req, res, next) => {
  try {
    // console.log(req);
    let results = await db.deparmentupdate(req.body);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendstatus(500);
  }
});
router.delete("/employeedelete/:id", async (req, res, next) => {
  try {
    // console.log(req);
    let results = await db.employeedelete(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendstatus(500);
  }
});
router.delete("/departmentdelete/:id", async (req, res, next) => {
  try {
    // console.log(req);
    let results = await db.departmentdelete(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendstatus(500);
  }
});
module.exports = router;
