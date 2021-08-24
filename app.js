const express = require('express');
const app = express()
const port = 3000

const items = ["Buy Food", "Cook Food", "Eat Food"]
const workItems = []

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

let options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
}

app.get('/', (req, res) => {
    let today = new Date()
    let day = today.toLocaleString('en-US', options)
    res.render('list', {listTitle: day, newListItems: items})

    // initial code for different days of the week using switch statement
    // switch(today){
    //     case 0:
    //         day = 'Sunday'
    //         break
    //     case 1:
    //         day = 'Monday'
    //         break
    //     case 2:
    //         day = 'Tuesday'
    //         break
    //     case 3:
    //         day = 'Wednesday'
    //         break
    //     case 4:
    //         day = 'Friday'
    //         break 
    //     case 5:
    //         day = 'Saturday'
    //         break
    //     default :
    //         console.log(`Error: Current day is ${day}`)
    //         break
    // }

    //initial code for weekend and weekday
    // if(today === 5 || today === 6){
    //     res.send("It's the weekend. Keep back and relax")
    // }else {
    //     res.send("Get up  and hustle cause it's a weekday!")
    // }
    // res.send("Working!")
})

app.post('/', (req, res) => {
    item = req.body.newItem
    // that 'name' property(list) has a dynamic value(listTitle) that is either day variable or "Work List" depending on the route
    // this is what is being used here to push into the correct array and redirect to the right route after updating the array 
    if(req.body.list === 'Work List'){
        workItems.push(item)
        res.redirect('/work')
    }else{
        items.push(item)
        res.redirect('/')
        // this redirects to the home route which then calls the app.get and then renders the things contained in the res.render
    }
})

app.get('/work', (req, res) => {
    res.render('list', {listTitle: "Work List", newListItems: workItems})
    workItems.push()
})

app.get('/about', (req, res) =>{
    res.render('about')
})

// app.post('/work', (req, res) =>{
//     let item = req.body.newItem
//     workItems.push(item)
//     res.redirect('/work')
// })

app.listen(port, () => console.log(`Server is up and running on port ${port}`))