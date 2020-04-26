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
    parser.add_argument('--write-dates', action='store_true', help="Write dates in front of post filenames (note that this is needed for Jekyll to successfully parse posts)")
    args = parser.parse_args()

    infile = args.input
    dest = args.destination
    overwrite = args.overwrite
    write_dates = args.write_dates;

    infile = Path(os.path.abspath(infile))
    dest = Path(os.path.abspath(dest))

    if not os.path.isdir(dest):
        print("Destination directory doesn't exist. Creating...")
        os.mkdir(dest)


    allKeys = []
    allFeatures = []
    allentries = []
    features_start_idx = 10000
    with open(infile, newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        isFeature = False
        firstRow = True
        for row in reader:
            if firstRow: # Parse Header
                firstRow = False
                idx=0
                for heading in row:
                    if heading == "FEATURES:":
                        features_start_idx = idx
                    else:
                        allKeys.append(heading)
                        if idx > features_start_idx:
                            allFeatures.append(heading)
                    idx=idx+1
            else: # Parse Entry
                idx=0
                entry = {}
                for val in row:
                    if idx < features_start_idx: # Normal Key
                        entry[allKeys[idx]] = val
                    elif idx == features_start_idx: # All columns after this are feature values
                        entry['feature_names'] = []
                        entry['feature_values'] = []
                    else: # Tag
                        entry['feature_names'].append(allFeatures[idx-features_start_idx-1])
                        entry['feature_values'].append(val)
                    idx=idx+1
                allentries.append(entry)


    # Write Markdown files
    for entry in allentries:
        if write_dates:
            datestring = entry['entry-date']
            filepath = os.path.join(dest, datestring + "-" + entry['filename'])
        else:
            filepath = os.path.join(dest, entry['filename'])
        exists = os.path.isfile(filepath)
        if exists and not overwrite:
            print("File exists, ignoring: {}".format(entry['filename']))
        else:
            content = entry.pop('content')
            fnames = entry.pop('feature_names')
            fvals = entry.pop('feature_values')
            post = Post(content, **entry, tags=fnames, weights=fvals)
            with open(filepath, 'w+') as file:
                file.write(fm.dumps(post, default_flow_style=None))
                if exists:
                    print("Overwriting: {}".format(entry['filename']))
                else:
                    print("Creating file: {}".format(entry['filename']))
