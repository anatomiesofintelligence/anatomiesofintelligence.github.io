#!/usr/bin/env python
"""
Generates markdown posts from a csv flat file database
"""
import os
import sys
import argparse
import csv
import frontmatter as fm
from frontmatter import Post
from pathlib import Path
import string
import re

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('input', help="Input csv file")
    parser.add_argument('destination', help="Destination directory where markdown files will be written")
    parser.add_argument('--overwrite', action='store_true', help="Overwrite markdown files if they already exist")
    args = parser.parse_args()

    infile = args.input
    dest = args.destination
    overwrite = args.overwrite

    infile = Path(os.path.abspath(infile))
    dest = Path(os.path.abspath(dest))

    if not os.path.isdir(dest):
        print("Destination directory doesn't exist. Creating...")
        os.mkdir(dest)


    entryKeys = []
    entryTags = []
    allentries = []
    tag_start_idx = 10000
    with open(infile, newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        isTag = False
        firstRow = True
        for row in reader:
            if firstRow: # Parse Header
                firstRow = False
                idx=0
                for heading in row:
                    if heading == "TAGS:":
                        tag_start_idx = idx
                    else:
                        entryKeys.append(heading)
                        if idx > tag_start_idx:
                            entryTags.append(heading)
                    idx=idx+1
            else: # Parse Entry
                idx=0
                entry = {}
                for val in row:
                    if idx < tag_start_idx: # Normal Key
                        entry[entryKeys[idx]] = val
                    elif idx == tag_start_idx: # First Tag
                        entry['tags'] = [entryTags[0]]
                        entry['weights'] = [val]
                    else: # Tag
                        entry['tags'].append(entryTags[idx-tag_start_idx-1])
                        entry['weights'].append(val)
                    idx=idx+1
                allentries.append(entry)


    # Write Markdown files
    for entry in allentries:
        filepath = os.path.join(dest, entry['filename'])
        exists = os.path.isfile(filepath)
        if exists and not overwrite:
            print("File exists, ignoring: {}".format(entry['filename']))
        else:
            content = entry.pop('content')
            tags = entry.pop('tags')
            weights = entry.pop('weights')
            post = Post(content, **entry, tags=tags, weights=weights)
            with open(filepath, 'w+') as file:
                file.write(fm.dumps(post))
                if exists:
                    print("Overwriting: {}".format(entry['filename']))
                else:
                    print("Creating file: {}".format(entry['filename']))
