const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    const a = 1
    const b = 2
    const c = a + b
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
