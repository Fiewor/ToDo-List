const express = require('express');
const app = express()
const port = 3000

const items = ["Buy Food", "Cook Food", "Eat Food"]

app.set('view engine', 'ejs')

let options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
}

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    let today = new Date()
    let day = today.toLocaleString('en-US', options)
    res.render('list', {kindOfDay: day, newListItems: items})
})

app.post('/', (req, res) => {
    item = req.body.newItem
    newListItems.push(item)
    res.redirect('/')
})

app.listen(port, () => console.log(`Server is up and running on port ${port}`))