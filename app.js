const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const port = process.env.PORT || 8008

const {exec, execSync} = require('child_process')

const logFile = "build.log"
const outDir = path.join(__dirname, 'dist')
if (!fs.existsSync(outDir)) {
  console.log(`Building (log: ${logFile})...`)
  execSync(`date > ${logFile}; npm run build >> ${logFile}`)
} else {
  console.log(`Building in background (log: ${logFile}).`)
  console.log("Next person to call the site will get the updated version")
  exec(`date > ${logFile}; npm run build >> ${logFile}`)
}

app.use(express.static(outDir))

app.get('/:acct', (req, res) => {
  console.log("requesting for:", req.params)
  res.sendFile('index.html', {root: outDir });
});

app.listen(port)
console.log(`== App is running on port: ${port} ==`)
