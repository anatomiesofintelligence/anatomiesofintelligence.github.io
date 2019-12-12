---
title: K-means Initialization Strategies
layout: text
entry-by: Jonathan Reus
entry-date: 2019-06-21
source-url: https://www.scirp.org/journal/paperinformation.aspx?paperid=82761
source: Li, B.Y. (2018) An Experiment of K-Means Initialization Strategies on Handwritten Digits Dataset. Intelligent Information Management , 10, 43-48.
copyright: © 2018 by author and Scientific Research Publishing Inc. This work is licensed under the Creative Commons Attribution International License (CC BY 4.0).
tags: [statistical-ontology, kmeans, clustering, collection, measurement, orientation, cut, cutting]
weights: [0.23, 0.76, 0.81, 0.35, 0.69, 0.18, 0.02, 0.06]
summary: A summary of K-means evaluation strategies
---
## 3.2. Clustering Performance Evaluation
### 3.2.1. Inertia
Inertia or within-cluster sum of squares distance is a key measure to evaluate the
internally coherent of clustering. The sum of squared distance is calculated between
each point and its nearest centroid.
### 3.2.2. Homogeneity (Shorthand as Homo)
In fact, the result of clustering should satisfy homogeneity. It means that each
point only belongs to a cluster. This rule should be also independent of labels.
The range of score should be standardized between 0.0 and 1.0.
### 3.2.3. Completeness (Shorthand as Compl)
Completeness measure how well the K-means algorithm assigns all the data
points with a given label to the same group. Meanwhile, the score should be
standardized from 0.0 to 1.0.
### 3.2.4. V-Measure (Shorthand as V-Meas)
Specifically, V-measure measures the harmonic criteria whether it has satisfied
the homogeneity and completeness. In addition, the score is from 0.0 to 1.0.
### 3.2.5. Silhouette Coefficient (Shorthand as Silhouette)
The Silhouette Coefficient for a sample is defined as:

<a href="https://www.codecogs.com/eqnedit.php?latex=silhouette&space;=&space;\frac{a-b}{max(a,b)}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?silhouette&space;=&space;\frac{a-b}{max(a,b)}" title="silhouette = \frac{a-b}{max(a,b)}" /></a>

where a is the mean of intra-cluster distance, b indicates the nearest-cluster distance.
Moreover, the range of the parameter is −1 ~ 1. Specifically, 1 is the best
result and −1 is the worst result. The higher the score of Silhouette Coefficient is,
the more suitable the model satisfies the defined clusters.
