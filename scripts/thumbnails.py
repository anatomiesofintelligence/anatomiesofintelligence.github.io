# Command line tool creates image thumbnails
# Either takes 1+ files (wildcards allowed)
# Or takes a single directory name
# By default writes thumbnails in place, but accepts
# an optional destination directory.

import argparse
from PIL import Image
import pathlib
import os

def makeThumb(sourcefile, destfile, thumbsize):
    print("Makethumb: {} {}".format(sourcefile, destfile))
    with Image.open(sourcefile) as im:
        #print(im)
        #im.thumbnail(thumbsize)
        #im.save(destfile)
        pass


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('file', nargs='+', help="Must be either a single input directory or a list of files (wildcards ok)")
    parser.add_argument('-o', nargs=1, help="Optional destination directory, if none provided then outputs to the same directory")
    parser.add_argument('-r', action='store_true', help="Dig recursively through directories and recreate directory structures in destination")
    parser.add_argument("-dimensions", type=int, default=57120, help="The port to send OSC to")
    clargs = parser.parse_args()
    files = clargs.file
    if clargs.o is None:
        destination = os.path.dirname(files[0])
    else:
        destination = clargs.o[0]

    dest = os.path.abspath(destination)
    print("Destination dir:", dest)
    recursive = clargs.r


    thumbsize = (128, 128)

    if not os.path.isdir(dest):
        os.mkdir(dest)

    ## TODO: I am in the middle of making this part work...
    if os.path.isdir(files[0]):
        if recursive:
            # recursively dig into the directory
            baseRoot = None
            for root, dirs, files in os.walk(infilepath):
                if baseRoot is None:
                    baseRoot = root
                print("WALKING: ", baseRoot, root, dirs, files)
                for filename in files:
                    fn, ext = os.path.splitext(filename)
                    newfile = fn+"_th"+ext
                    destfilepath = os.path.join(os.path.join(dest, root), newfile)
                    makeThumb(os.path.join(root, filename), destfilepath, thumbsize)
        else:
            # process directory contents without recursion
            pass
    else:
        # list of files
        for infile in files:
        infilepath = os.path.abspath(infile)
        print("INFILE: ", infile)
        if os.path.isdir(infilepath):
            print("Ignoring directory {}".format(infile))
        else:
            # Just a file
            fn, ext = os.path.splitext(os.path.basename(infile))
            newfile = fn+"_th"+ext
            newfile = os.path.join(dest, newfile)
            makeThumb(infilepath, newfile, thumbsize)
            # dig in recursively
