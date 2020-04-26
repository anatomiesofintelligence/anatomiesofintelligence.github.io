---
copyright: ''
entry-by: Jonathan Reus
entry-date: 2019-12-8
entry-type: image
filename: principal-component-analysis-cloud-projections.md
image: p/pca-projections.png
layout: image
source: stackexchange.com
source-url: https://stats.stackexchange.com/questions/2691/making-sense-of-principal-component-analysis-eigenvectors-eigenvalues
summary: Illustration of PCA projections of point clouds
tags: [Boerhaave, COGWEB, Chinese, LSTM, Leiden, PGM, RNN, Ruysch, actors, aesthesis,
  agency, algorithm, analysis, anatomical, anatomy, androgynous, architecture, archive,
  artificialia, axis, black-box, body, botanical, brain, categories, categorization,
  channel, character recognition, chinese, classification, clustering, cnn, codes,
  cognition, collecting, collection, collections, colonialism, commodification, concept,
  conceptual-clustering, convolutional neural network, cost, counting, cut, cuts,
  cutting, datasets, demonstration, diagram, dimensionality, disgust, dissection,
  distance, domestication, elegance, epistemology, error, euclidean, evaluation, eye,
  figures, finger, forecasting, forensics, frame, freakish, geometry, gesture, gestures,
  gradient descent, graph, graphs, grouping, hacking, hand, hand writing, hands, hands-on,
  handwriting, hardware, history, human, human body, imagination, imperfect, inscription,
  instruments, joint, kmeans, knowledge, labeling, landmark, learning, location, machine
    learning, machines, materiality, meaning, measurement, memory, mnist, model, models,
  monsters, muscles, mystical, mythological, naturalia, nerves, nervous system, network,
  networks, neural networks, neural-anatomy, neuron, nonlinearity, observation, offline,
  online, ontologies, ontology, ontology-building, optimization, orientation, orthogonality,
  parallel, pca, perception, perceptron, perfection, performance, planes, poetic,
  position, prediction, preparation, preparations, projection, proportion, proportions,
  psychology, python, races, representation, representations, rhetoric, rnn, segments,
  selection, sensory experience, sensory perception, similarity, skeleton, skin, skull,
  skulls, space, sparseness, spectacle, spectators, speech, standard, statistic-ontology,
  statistical, statistical-ontology, svm, symbols, tacit, taxonomy, theatre, time-series,
  timeseries, tools, topological, training, treatise, trial, truth, type, typography,
  unsupervised, vision, visualization, wellcome, word2vec, writing, zodiac]
title: Principal Component Analysis Cigar, Egg, Cloud Projections
weights: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0.71', '0', '0.61',
  '0', '0', '0', '0.854', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0.63', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0.51', '0', '0',
  '0.99', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0.766', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0.34', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0.45', '0', '0', '0', '0']
---

The figure shows some clouds of 200 points each, along with ellipsoids containing 50% of each cloud and axes aligned with the principal directions. In the first row the clouds have essentially one principal component, comprising 95% of all the variance: these are the cigar shapes. In the second row the clouds have essentially two principal components, one about twice the size of the other, together comprising 95% of all the variance: these are the pancake shapes. In the third row all three principal components are sizable: these are the egg shapes.

PCA fits an ellipsoid to the data. An ellipsoid is a multidimensional generalization of distorted spherical shapes like cigars, pancakes, and eggs. These are all neatly described by the directions and lengths of their principal (semi-)axes, such as the axis of the cigar or egg or the plane of the pancake. No matter how the ellipsoid is turned, the eigenvectors point in those principal directions and the eigenvalues give you the lengths. The smallest eigenvalues correspond to the thinnest directions having the least variation, so ignoring them (which collapses them flat) loses relatively little information.

Being able to reduce dimensions is a good thing: it makes it easier to describe the data and, if we're lucky to reduce them to three or less, lets us draw a picture.