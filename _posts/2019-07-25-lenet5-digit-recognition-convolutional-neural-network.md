---
copyright: ''
entry-by: Jonathan Reus
entry-date: '2019-07-25'
entry-type: image
filename: lenet5-digit-recognition-convolutional-neural-network.md
image: l/lenet5-architecture.gif
layout: image
source: LeCun, Yann, et al. "Gradient-based learning applied to document recognition."
  Proceedings of the IEEE 86.11 (1998) 2278-2324.
source-url: http://yann.lecun.com/exdb/publis/index.html#lecun-98
summary: 'Architecture of LeNet-5, a Convolutional Neural Network, in this paper used
  for handwritten digit recognition. Each plane is a feature map, i.e. a set of units
  whose weights are constrained to be identical. LeNet-5 comprises 7 layers, not counting
  the input, all of which contain trainable parameters (weights). The input is a 32x32
  pixel image. This is significantly larger than the largest character in the (MNIST)
  database (at most 20x20 pixels centered in a 28x28 field). The reason is that it
  is desirable that potential distinctive features such as stroke end-points or corner
  can appear in the center of the receptive field of the highest-level feature detectors.

  In LeNet-5 the set of centers of the receiptive fields of the last convolutional
  layer form a 20x20 area in the center of the 32x32 input. The values of the input
  pixels are normalized so that the background level (white) corresponds to a value
  of -0.1 and the foreground (black) corresponds to 1.175. This makes the mean input
  roughly 0, and the variance roughly 1 which accelerates learning.'
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
title: LeNet-5 Convolutional Neural Network Architecture
weights: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0.933', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0.932', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0.932', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0.12', '0', '0', '0', '0', '0', '0', '0.05',
  '0', '0.54', '0', '0', '0', '0', '0', '0', '0.03', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0.654', '0.778', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
---