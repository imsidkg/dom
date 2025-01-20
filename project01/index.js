const express = require('express')
const app = express()
const PORT = 3000
const users = require('./MOCK_DATA.json')

app.get('/api/users' , (req ,res) => {
    return res.json(users)
})

app.route('/api/users/:id').get((req, res) => {
    const id = Number(req.params.id) ;
    const user = users.find((user) => user.id === id);
    return res.json(user)
})
app.listen(PORT , () => console.log(`App is running on port ${PORT}`))