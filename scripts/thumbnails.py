#!/usr/bin/env python
"""
Make a CSV file from all markdown posts in a given directory.
Command line tool creates image thumbnails
Either takes 1+ files (wildcards allowed)
Or takes a single directory name
By default writes thumbnails in place, but accepts
an optional destination directory.
"""
import argparse
from PIL import Image
import pathlib
import os

def makeThumb(sourcefile, destfile, thumbsize):
    with Image.open(sourcefile) as im:
        im.thumbnail(thumbsize)
        im.save(destfile)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('inputdir', help="Input directory containing image files")
    parser.add_argument('-overwrite', action='store_true', help="Overwrite existing image files")
    parser.add_argument("-twidth", type=int, default=128, help="Thumbnail width")
    parser.add_argument("-theight", type=int, default=128, help="Thumbnail height")
    parser.add_argument("-postfix", default="_th", help="Postfix for thumbnail files")
    clargs = parser.parse_args()

    indir = os.path.abspath(clargs.inputdir)
    thumbsize = (clargs.twidth, clargs.theight)
    overwrite = clargs.overwrite
    postfix = clargs.postfix

    if not os.path.isdir(indir):
        raise IOError("Source must be a directory: {}".format(indir))
    else:
        # recursively dig into the directory and parse all image files
        for root, dirs, files in os.walk(indir):
            for filename in files:
                sourcefile = os.path.join(root, filename)
                fn, ext = os.path.splitext(filename)
                if ext.lower() in ['.jpeg', '.jpg', '.png', '.gif']:
                    isthumb = fn[(-len(postfix)):] == postfix
                    if not isthumb:
                        newfilename = fn+postfix+ext
                        newfilepath = os.path.join(root, newfilename)
                        exists = os.path.isfile(newfilepath)
                        if exists:
                            if overwrite:
                                print("Overwriting {}".format(newfilename))
                                makeThumb(sourcefile, newfilepath, thumbsize)
                            else:
                                print("Skipping image with existing thumb {}".format(filename))
                        else:
                            print("Writing {}".format(newfilename))
                            makeThumb(sourcefile, newfilepath, thumbsize)
                else:
                    print("Ignoring {}".format(sourcefile))
