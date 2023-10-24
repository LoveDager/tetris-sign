# move into the folder with all frames
cd ./tetris-game/frames/

# make all images into a gif with ffmpeg
# -f image2: force format to image2
# -framerate 50: set framerate to 50
# -i %05d.png: input all images with 5 digits (00000.png, 00001.png, etc.)
# -vf "transpose=0": rotate the image 90 degrees clockwise
# 24k.gif: output file name
ffmpeg -f image2 -framerate 50 -i %05d.png -vf "transpose=0" 24k.gif