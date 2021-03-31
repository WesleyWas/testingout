import express from 'express'
import fs from 'fs'
import check_conditionnal from './src/check_conditionnal.js'

const app = express();
const port = 8080;

app.listen(port, () => {
    console.log('Assessment API Listening on port ' + port + '...');
})

app.get('/check/:group/:condition', async (req,res) => {
    const groupIdentifier = req.params.group;
    const conditionToVerify = req.params.condition;

    var isExact = Boolean(await check_conditionnal(false, groupIdentifier, conditionToVerify));

    let response = {
        isExact: isExact
    }

    let data = JSON.stringify(response);

    res.status(200).json(data);
    console.log('Response has been send. This assessment is ' + isExact);

})