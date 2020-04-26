---
copyright: © 2018 by author and Scientific Research Publishing Inc. This work is licensed
  under the Creative Commons Attribution International License (CC BY 4.0).
entry-by: Jonathan Reus
entry-date: '2019-06-21'
entry-type: ''
filename: kmeans-initialization-strategies.md
image: ''
layout: text
source: Li, B.Y. (2018) An Experiment of K-Means Initialization Strategies on Handwritten
  Digits Dataset. Intelligent Information Management , 10, 43-48.
source-url: https://www.scirp.org/journal/paperinformation.aspx?paperid=82761
summary: A summary of K-means evaluation strategies
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
title: K-means Initialization Strategies
weights: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0.81',
  '0', '0', '0', '0', '0.35', '0', '0', '0', '0', '0', '0', '0', '0', '0.02', '0',
  '0.06', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0.76', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0.69', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0.18', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0.23', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
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