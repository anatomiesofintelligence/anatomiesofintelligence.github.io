---
copyright: Copyright 2008, Springer-Verlag London Limited
entry-by: Jonathan Reus
entry-date: '2019-06-21'
entry-type: ''
filename: understanding-clustering-measure-of-concordance.md
image: m/moc-plot-and-shapes.png
layout: image
source: Pfitzner, D., Leibbrandt, R. & Powers, D. Knowl Inf Syst (2009) 19 361. https://doi.org/10.1007/s10115-008-0150-6
source-url: https://link.springer.com/article/10.1007/s10115-008-0150-6
summary: A paradigm apparatus for the evaluation of clustering comparison techniques
  and distinguish between the goodness of clusterings and the similarity of clusterings
  by clarifying the degree to which different measures confuse the two. Accompanying
  this is the proposal of a novel clustering similarity measure, the Measure of Concordance
  (MoC).
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
title: Understanding Clusters - Range and Shape Keys in Measure of Concordance
weights: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0.71',
  '0', '0', '0', '0', '0.311', '0', '0', '0', '0', '0', '0', '0.1', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0.21', '0', '0', '0', '0', '0', '0.75', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0.5998', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0.51', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0.13', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
---

Range and shape key Following is a short summary of of the different graphical shapes and
descriptor labels used to characterise a measure’s general behaviour for each given test.

* Constant functions are indicated by the symbol C.
* Linear functions are indicated by the symbol L, with a subscript of either F or R to
indicate whether their value respectively falls or rises over the interval.
* Non-linear functions are described in terms of whether the absolute value of their derivative
over the interval is increasing or decreasing, i.e. whether the function value is
accelerating or decelerating. Decelerating functions are indicated by the symbol D, and accelerating functions by the letter A, with subscripts F and R indicating falling and
rising behaviour as before.
* Sigmoid functions can be described as piecewise functions assembled from a pair of
falling or a pair of rising functions, with the two members of the pair exhibiting opposite
accelerating/decelerating behaviour. So for instance, the shape labelled as SADF in Fig. 6g
is constructed from an initial AF function followed by a DF function. The other three
sigmoid functions are defined similarly.
* Functions which are undefined over the interval are indicated by a U.
* Other functions are indicated by an X, however there is only one such function (Forbes
in the Incremental Independence test.)