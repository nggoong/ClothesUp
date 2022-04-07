const fs = require('fs');

const express = require('express');
const mariadb = require('mariadb/callback');
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`connecting ${port} port.`));


const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

const connection = mariadb.createConnection({
    host : conf.host,
    database : conf.database,
    user : conf.user,
    password : conf.password,
    port : conf.port,
  })

  connection.connect((err) => {
      if (err) throw err;
      console.log('Database Connected');
  });

  app.post('/api/member/signup', (req, res)=> {
    //   let sql = 'insert into customer values (?, ?, ?, ?, ?, ?, now(), 0)';
    let sql = 'insert into member values (?, ?, ?, ?, ?)';
    let id = req.body.id;
    let userID = req.body.userID
    let nickname = req.body.nickname;
    let birth = req.body.birthday;
    let password = req.body.password;
    let params = [id, userID, nickname, birth, password];

    connection.query(sql, params,
        (err, results, fields) => {
            if(err) throw err;
             res.send(results);
        })
  })

  app.get('/api/member/memberInfo', (req, res)=> {
      let sql = 'select * from member;';
      connection.query(sql, (err, results, fields)=> {
          if(err){
              res.send(err);
              return;
          }
          res.send(results);
      })
  })
