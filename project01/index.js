const express = require('express')
const fs = require('fs')
const app = express()
const PORT = 3000
const users = require('./MOCK_DATA.json')
const { error } = require('console')

app.use(express.urlencoded({extended: false}))

app.get('/api/users' , (req ,res) => {
    return res.json(users)
})

app.route('/api/users/:id').get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
}).delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    console.log( )

    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    // Remove user from the array
    users.splice(userIndex, 1);

    // Write the updated array to the file
    fs.writeFile('MOCK_DATA.json', JSON.stringify(users, null, 2), (error) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Failed to update data file" });
        }
        return res.json({ status: "User deleted successfully" });
    });
});

app.post('/api/user',(req,res) => {
    const  body = req.body
    users.push({...body , id: users.length+1}) 
    fs.appendFile('MOCK_DATA.json' , JSON.stringify(users), (error,data) => {
        return res.json({status : "pending"})
    })
    console.log(body)
})
app.listen(PORT , () => console.log(`App is running on port ${PORT}`))