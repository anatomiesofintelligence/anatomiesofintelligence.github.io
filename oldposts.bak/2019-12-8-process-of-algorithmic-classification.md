---
title: Overview of Process of Algorithmic Classification
layout: image
entry-type: image
image: c/classification-overview.png
entry-date: 2019-12-8
entry-by: Jonathan Reus
source-url: https://www.sciencedirect.com/science/article/abs/pii/S1740674906000102?via%3Dihub
source: Girolami, Mark, Harald Mischak, and Ronald Krebs. "Analysis of complex, multidimensional datasets." Drug Discovery Today, Technologies 3.1 (2006), 13-19.
copyright: 2006 Published by Elsevier Ltd.
tags: [classification, categorization, dimensionality]
weights: [0.85, 0.3, 0.91]

summary: "Summary Illustration of an Algorithmic Classification Process"
---
Methods for classification based on classical multivariate
statistical theory should not be applied onto data where the
number of dimensions exceeds the number of examples.
For instance, data derived from a microarray study aimed towards
the establishment of a classifier which will discriminate
between diseased and healthy tissue might well describe
the expression levels of over 20,000 genes for each tissue
sample, with generally far less than 1000 examples of each
type of tissue. The problem that is encountered is the ‘Curse
of Dimensionality’ [14], which basically tells us that when the
number of samples is small compared to the dimensionality
of the samples, a perfect classification can be achieved in the
dataset by chance. The classifier will make decisions which
have little to do with the information content of the data.
This will produce a classifier which will subsequently make
poor predictions on new datasets. To solve this problem,
several strategies have been developed.
One such strategy is to select the individual single features
which show high discriminatory power between the classes.
This can be achieved by performing several possible statistical
tests to assess, for example, significant differences of
mean or median values across classes. This form of feature
ranking and selection will reduce the number of features
which subsequently can be used to build the classifier
and help to reduce the variability in the eventual classifier
performance.
