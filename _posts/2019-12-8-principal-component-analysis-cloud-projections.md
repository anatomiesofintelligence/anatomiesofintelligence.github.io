---
title: Principal Component Analysis Cigar, Egg, Cloud Projections
layout: image
entry-type: image
image: p/pca-projections.png
entry-date: 2019-12-8
entry-by: Jonathan Reus
source-url: https://stats.stackexchange.com/questions/2691/making-sense-of-principal-component-analysis-eigenvectors-eigenvalues
source: stackexchange.com
copyright:
tags: [dimensionality, similarity, pca, projection, measurement, cut, cutting, orientation, visualization]
weights: [0.854, 0.34, 0.99, 0.566, 0.733, 0.41, 0.81, 0.21, 0.63, 0.501]

summary: "Illustration of PCA projections of point clouds"
---
The figure shows some clouds of 200 points each, along with ellipsoids containing 50% of each cloud and axes aligned with the principal directions. In the first row the clouds have essentially one principal component, comprising 95% of all the variance: these are the cigar shapes. In the second row the clouds have essentially two principal components, one about twice the size of the other, together comprising 95% of all the variance: these are the pancake shapes. In the third row all three principal components are sizable: these are the egg shapes.

PCA fits an ellipsoid to the data. An ellipsoid is a multidimensional generalization of distorted spherical shapes like cigars, pancakes, and eggs. These are all neatly described by the directions and lengths of their principal (semi-)axes, such as the axis of the cigar or egg or the plane of the pancake. No matter how the ellipsoid is turned, the eigenvectors point in those principal directions and the eigenvalues give you the lengths. The smallest eigenvalues correspond to the thinnest directions having the least variation, so ignoring them (which collapses them flat) loses relatively little information.

Being able to reduce dimensions is a good thing: it makes it easier to describe the data and, if we're lucky to reduce them to three or less, lets us draw a picture.
