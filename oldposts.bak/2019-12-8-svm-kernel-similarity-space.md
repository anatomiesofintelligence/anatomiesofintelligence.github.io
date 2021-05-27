---
title: Support Vector Machine Kernel Similarity Space for Categorization
layout: image
entry-type: image
image: s/svm-kernel-similarity.png
entry-date: 2019-12-8
entry-by: Jonathan Reus
source-url: https://www.sciencedirect.com/science/article/abs/pii/S1740674906000102?via%3Dihub
source: Girolami, Mark, Harald Mischak, and Ronald Krebs. "Analysis of complex, multidimensional datasets." Drug Discovery Today, Technologies 3.1 (2006), 13-19.
copyright: 2006 Published by Elsevier Ltd.
tags: [classification, categorization, dimensionality, similarity, svm]
weights: [0.15, 0.12, 0.6, 0.52, 0.99]

summary: "Illustration of SVM Similarity Matrix"
---
Instead of working with the original sample representation
in the original 6500 dimensional peptide space, SVM and GP
classification methods operate directly on what is called the KERNEL
MATRIX (see Glossary). This matrix has elements which correspond to
the similarities between data points in the original space; in other
words, each element of the matrix gives a measure of how similar the
measured peptide profiles are between a pair of samples (red
indicates highly similar and blue indicates dissimilarity). So the above
figure shows how similar the peptide profiles are for every pair of
samples available, where each axis corresponds to the total available
samples (100 in total). The first thing to note is that we have now
drastically reduced the dimensionality of the representation of each
sample, from a point in a 6500 dimensional peptide profile space to a
point in a 100 dimensional ‘peptide profile similarity space’. The
second thing to note is that the matrix identifies that there are two
groups of samples which all share highly similar peptide profiles
(samples 1–45 and samples 46–86) with some evidence of a smaller
group (samples 86–100). This data representation is now employed in
SVM and GP classifiers rather than the original multidimensional
space.

SVMs often are reported as achieving superior classification performance compared to other methods
when compared across most applications and tasks. What
is of importance is that they are fairly insensitive to the ‘Curse
of Dimensionality’, primarily because of the use of the ‘kernel’
matrix [26]. This matrix is derived from the similarities
between samples and thus operate on dimensions which are
equal to the number of data points available. (Figure 3 gives
an example derived from 100 samples, each of dimension
6500.) Therefore, SVMs are computationally reasonably efficient
to cope with large-scale classification in both sample
and variables. In clinical bioinformatics, they have the potential
to provide powerful experimental disease diagnostic
models based on gene or protein expression data with thousands
of features and a small number, as little as a few dozen
of samples [27,28].
