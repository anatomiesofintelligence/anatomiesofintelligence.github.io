---
copyright: 2006 Published by Elsevier Ltd.
entry-by: Jonathan Reus
entry-date: 2019-12-8
entry-type: image
feature_names: [Boerhaave, Boerhaave, COGWEB, Chinese, LSTM, Leiden, PGM, RNN, Ruysch,
  actors, aesthesis, agency, algorithm, analysis, anatomical, anatomy, androgynous,
  architecture, archive, artificialia, axis, black-box, body, botanical, brain, categories,
  categorization, channel, character recognition, chinese, classification, clustering,
  cnn, codes, cognition, collecting, collection, collections, colonialism, commodification,
  concept, conceptual-clustering, convolutional neural network, cost, counting, cut,
  cuts, cutting, datasets, demonstration, diagram, dimensionality, disgust, dissection,
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
  unsupervised, vision, visualization, wellcome, word2vec, writing, zodiac, '']
feature_values: ['', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0.3', '0', '0', '0',
  '0.85', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0.91', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '']
filename: process-of-algorithmic-classification.md
image: c/classification-overview.png
layout: image
source: Girolami, Mark, Harald Mischak, and Ronald Krebs. "Analysis of complex, multidimensional
  datasets." Drug Discovery Today, Technologies 3.1 (2006), 13-19.
source-url: https://www.sciencedirect.com/science/article/abs/pii/S1740674906000102?via%3Dihub
summary: Summary Illustration of an Algorithmic Classification Process
title: Overview of Process of Algorithmic Classification
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