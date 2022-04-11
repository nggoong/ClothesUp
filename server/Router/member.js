const express = require('express');
const router = express.Router();

router.get('/member/memberInfo', (req, res)=> {
    let sql = 'select * from member;';
    connection.query(sql, (err, results, fields)=> {
        if(err){
            res.send(err);
            return;
        }
        res.send(results);
    })
})

module.exports = router;