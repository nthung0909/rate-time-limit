const express = require('express');
const rateLimit = require('express-rate-limit');
const port = 3000;

const app = express();
const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 2,
    handler: function (req, res) {
        res.status(429).send({
            status: 500,
            message: 'Too many requests!',
        });
    },
    //white list ip
    skip: (req, res) => {
        if(req.ip === '172.29.12.2')
            return true;
        return false;
    }
});

app.get('/', apiLimiter, (req,res) => {
   res.send(`I'm CuaMotCang`);
})

app.listen(port, () => {
    console.log(`App is running in port ${port}`);
})



