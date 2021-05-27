---
title: Choosing K via Elbowpoint Method
layout: image
entry-type: image
image: k/kmeans-elbow-point.png
entry-date: 2019-12-8
entry-by: Jonathan Reus
source-url: https://towardsdatascience.com/k-means-clustering-introduction-to-machine-learning-algorithms-c96bf0d5d57a
source: TowardsDataScience K-Means Clustering — Introduction to Machine Learning Algorithms Simplest clustering algorithm — Code & Explanation. Rohith Gandhi
copyright:
tags: [clustering, classification, categorization, dimensionality, optimization, measurement, cutting, joint]
weights: [0.85, 0.3, 0.91, 0.22, 0.832, 0.542, 0.2, 0.43]

summary: "Graph displaying an optimal cluster configuration at the elbow point"
---
Often it is uncertain how many clusters is best to choose. In the elbow point method, you choose a different number of clusters and start plotting the within-cluster distance to the centroid.

From this graph we can infer that at k=4, the graph reaches an optimum minimum value. Even though the within-cluster distance decreases after 4, we would be doing more computations. Therefore, we choose a value of 4 as the optimum number of clusters.
