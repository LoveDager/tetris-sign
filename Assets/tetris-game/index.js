// WARNING ONLY RUN THIS LOCALLY
// https://macr.ae/article/canvas-to-gif
// Stich wth ffmpeg
// ffmpeg -f image2 -framerate 50 -i %002d.png out.gif


const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Serve static files from the static directory.
app.use(express.static('static'));

app.post('/save-images', bodyParser.json({ limit: '500mb' }), (req, res) => {
  const { framesData } = req.body;
  const directory = 'frames';

  const timestamp = new Date().getTime();

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  for (const [frameName, frameData] of Object.entries(framesData)) {
    const base64Data = frameData.replace(/^data:image\/png;base64,/, '');

    let filename = `${directory}/${timestamp}_${frameName}.png`;

    fs.writeFileSync(filename, base64Data, 'base64'); console.log('saved', filename);
  }

  console.log(
    `Saved ${Object.keys(framesData).length} files to ${
      directory
    } directory`
  );

  res.send('okay :)');
});

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}, open link to generate the tetris images`);
});