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
      connection.query(sql,
        (err, results, fields)=> {
          if(err) throw err;
          res.send(results);
      })
  })


const multer = require('multer');

// 업로드 폴더 설정(사용자의 파일이 저장되는 폴더)
const upload = multer({dest: './upload'});
app.use('/image', express.static('./upload')) // upload폴더에서 정적 파일 제공, image 가상 폴더와 바인딩

app.post('/api/posting/clothes-post', upload.single('image'), (req, res) => {
    let sql = 'insert into clothespost values (null, ?, ?, ?, ?, ?, null)';
    let nickname = req.body.nickname;
    let title = req.body.title;
    let contents = req.body.contents;
    let hashtag = req.body.hashtag;
    let image = '/image/' + req.file.filename;
    let params = [nickname, title, contents, hashtag, image];
  
    connection.query(sql, params,
        (err, rows, fields) => {
            if(err) throw err;
            res.send({message:"전송은 되었다"});
        })
  })


  // 12개씩 옷 포스팅 불러오기
  app.get('/api/posting/clothes-post/count/:num', (req, res)=> {
      let sql = `select * from clothespost order by id desc limit ${req.params.num}, 12`;
      connection.query(sql, (err, results, fields)=> {
          res.send(results);
      })
  })

app.post('/api/posting/codi-post', upload.single('image'), (req, res) =>{
    let sql = 'insert into codipost values (null, ?, ?, ?, ?, ?, null)';
    let nickname = req.body.nickname;
    let title = req.body.title;
    let contents = req.body.contents;
    let hashtag = req.body.hashtag;
    let image = '/image/' + req.file.filename;
    let params = [nickname, title, contents, hashtag, image];
    
    connection.query(sql, params,
        (err, rows, fields) => {
            if(err) throw err;
            res.send({message:"전송은 되었다."});
        })
})

// 12개씩 코디 포스팅 불러오기
app.get('/api/posting/codi-post/count/:num', (req, res)=>{
    let sql = `select * from codipost order by id desc limit ${req.params.num}, 12`;
    connection.query(sql, (err, results, fields)=> {
        res.send(results);
    }) 
})
