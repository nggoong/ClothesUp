const fs = require('fs');

const express = require('express');
const mariadb = require('mariadb/callback');
const bodyParser = require('body-parser');
const { resolveSoa } = require('dns');
const app = express();

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`connecting ${port} port.`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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

  // 회원가입요청
  app.post('/api/member/signup', (req, res)=> {
    //   let sql = 'insert into customer values (?, ?, ?, ?, ?, ?, now(), 0)';
    let sql = 'insert into member values (null, ?, ?, ?, ?)';
    let userID = req.body.id;
    let nickname = req.body.nickname;
    let birth = req.body.birth;
    let password = req.body.password;
    let params = [userID, nickname, birth, password];

    connection.query(sql, params,
        (err, rows, fields) => {
            if(err) throw err;
            res.send({message:"전송은 되었다"});
        })
  })





  // 로그인 요청
  app.get('/api/member/login/:id', (req, res)=> {
      let sql = `select user_password from member where user_id='${req.params.id}';`;
      // let sql = 'select * from member';


      connection.query(sql,
        (err, results, fields)=> {
          if(err) throw err;
          res.send(results);
      })
  })
