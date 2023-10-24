# LED Matrix Tetris (Gif Player)

Components:
* Raspberry Pi Zero
* 64x32 LED Matrix
* Adafruit RGB Matrix Bonnet for Raspberry Pi


To get the matrix up and running there are two main parts:
1. Prepare your content, and
2. Getting the sign up and running

There are also some Assets provided in `assets/`:

1. The font `5x5.ttf` which is a 5 pixel tall font and looks great on the LED matrix
2. The game-over.psd which is a game over screen used in the tetris example
3. `tetris-game`: A small node.js server for generatinng tetris images and saving them as pngs, based on this tetris game https://mrcoles.com/tetris/ and this png-to-gif saver https://macr.ae/article/canvas-to-gif
4. `make-frames-into-gif.sh`: A short script using ffmpeg to make separate PNGs into a GIF for the sign

## Instructions to prepare your content

The sign accepts animated gifs in the resolution 64x32 (widescreen) where the actual bottom of the display is to the right edge.
Example: (4k.gif)

Other limitations: 
* A maximum of about 4000 frames seems to work, if your animation is longer, simply split it up into separate gifs, like `part1.gif`, `part2.gif` and so on...

## Instructions to get your sign up and running

### 1. Install Pi OS Lite

### 2. Boot into pi using keyboard and screen

### 3. Install the script for the LED Matrix
Tutorial can be found here: https://learn.adafruit.com/adafruit-rgb-matrix-bonnet-for-raspberry-pi/driving-matrices

```
curl https://raw.githubusercontent.com/adafruit/Raspberry-Pi-Installer-Scripts/main/rgb-matrix.sh >rgb-matrix.sh
sudo bash rgb-matrix.sh
```

### 4. Compile the image viewer
Tutorial here: https://github.com/hzeller/rpi-rgb-led-matrix/tree/master/utils#image-viewer

```
cd ~/rpi-rgb-led-matrix/utils
sudo apt-get update
sudo apt-get install libgraphicsmagick++-dev libwebp-dev -y
make led-image-viewer
```

### 5. Transfer all your gifs to the pi and save them to the `~/rpi-rgb-led-matrix/utils` folder (same as "led-image-viewer")

### 6. Create empty streamfiles for each of your gifs and give the script permission
Let's say you have the files `1.gif` and `2.gif`. Then you need to create `1.stream` and `2.stream` like this:

```
touch 1.stream 2.stream
chmod 666 *.stream
```

### 7. Pre-process the gifs into streamfiles

`-D500` represents a delay of 500ms per frame, see the specs for details
`1.gif` and `1.stream` should of course be replaced with the name of your gifs

```
sudo ./led-image-viewer --led-rows=32 --led-cols=64 --led-gpio-mapping=adafruit-hat -D500 16k.gif -O16k.stream
```

### 8. Create the run file
Now everything is prepped and we can create the file that will run the display when you plug in the cable

Use the command `nano run.sh` to open the editor and add:
```
date '+%m-%d-%y %H:%M:%S - Started' >> ./log.txt

sudo ./led-image-viewer --led-rows=32 --led-cols=64 --led-gpio-mapping=adafruit-hat -f -D500 4k.stream 8k.stream 12k.stream 16k.stream 20k.stream 24k.stream -D-1 game-over.stream 

date '+%m-%d-%y %H:%M:%S - Stopped' >> ./log.txt
```

### 9. Add the script to ccrontab to run on startup

CMD: `crontab -e`
Add:
```
@reboot cd /home/USERNAME/rpi-rgb-led-matrix/utils && bash ./run.sh
```

### 10. All done! Restart and the display should start automatically



# Other links
LINKS:
https://mrcoles.com/tetris/
https://macr.ae/article/canvas-to-gif
https://github.com/hzeller/rpi-rgb-led-matrix/tree/master/utils
https://learn.adafruit.com/adafruit-rgb-matrix-bonnet-for-raspberry-pi/driving-matrices