import express from 'express'
import path from 'path'
import fs from 'fs'
import https from 'https'
import fetch from 'node-fetch'

const app = express()
const dirname = path.resolve()
const BASE_PATH = 'https://dreamcube.singlife.com'
// Set the view engine to ejs
app.set('view engine', 'ejs')
const key = fs.readFileSync(path.join(dirname, 'server/localhost-key.pem'))
const cert = fs.readFileSync(path.join(dirname, 'server/localhost.pem'))
const server = https.createServer({ key: key, cert: cert }, app)
// Serve static files from the React app build directory
// https://dreamcube.singlife.com/api/index.php/?id=7&e=detail
// that api will response {
//     "found": true,
//     "id": "7",
//     "image": "https:\/\/dreamcube.singlife.com\/images\/360\/038.jpg",
//     "share": "https:\/\/dreamcube.singlife.com\/images\/share\/038.png",
//     "thumbnail": "https:\/\/dreamcube.singlife.com\/thumbnails\/live\/038.png",
//     "description": "Dining in Paris' finest restaurants"
// }
// create fetch
app.use(express.static(path.join(dirname, 'dist')))

app.get('*', async (req, res) => {
  //get path
  let description =
    'This is my financial freedom dream! Create yours with Singlife Dream Cube!'
  let image = null
  // filter if got share/explore-xx
  if (req.path.includes('share') || req.path.includes('explore')) {
    //get xx
    let pathNames = req.path.split('/').pop()
    let shareId = pathNames.split('-').pop()
    //get shareId
    console.log(shareId)
    try {
      const getData = await fetch(
        `https://dreamcube.singlife.com/api/index.php/?id=${shareId}&e=detail`,
      )
      const data = await getData.json()
      description = data?.description ?? ''
      image = data?.share ?? ''
    } catch (e) {
      console.log(e)
    }
  }
  // Define your dynamic meta tags
  const metaTags = {
    title: 'The Singlife Dream Cube',
    description: description,
    url: `${BASE_PATH}/${req.path}`,
    image: image,
  }
  // Render your EJS view and pass the metaTags object
  res.render(path.join(dirname, 'dist', 'index'), metaTags)
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
