---
copyright: ''
entry-by: Jonathan Reus
entry-date: '2019-06-21'
entry-type: ''
filename: conceptual-clustering.md
image: ''
layout: text
source: Stepp, Robert E., and Ryszard S. Michalski. "Conceptual clustering- Inventing
  goal-oriented classifications of structured objects." 1986.
source-url: https://dl.acm.org/citation.cfm?id=1625057
summary: ''
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
title: Conceptual Clustering
weights: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0.9',
  '0', '0', '0', '0', '0', '0', '0', '0', '0.88', '1', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0.67', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0.23', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0.44', '0', '0', '0', '0', '0', '0']
---

Creating a classification' is typically the first step in developing a theory about a collection of observations or phenomena. This process is a form of learning from observation (learning without a teacher), and its goal is to structure given observations it to a hierarchy of meaningful categories. The problem of automatically cre- ating such a hierarchy has so far received little attention in AI.

Yet creating classifications is a very basic and widely practiced intellectual process.
Past work on this problem was done mostly outside AI under the headings of numerical taxonomy and cluster analysis (Anderberg, 1973). Those methods are based on the application of a mathematical measure of similarity between objects, defined over a finite, a priori given set of object attributes. Classes of objects are taken as collections of objects with high intraclass and low interclass similarity. The methods assume that objects are characterized by sequences of attribute/value pairs and that this information is sufficient for creating a classification. The methods do not take into consideration any background knowledge about the semantic relationships among object attributes or global concepts that could be used for characterizing object configurations. Nor do they take into consideration possible goals of classification that might be indicated by background knowledge.

As a result, classifications obtained by traditional methods are often difficult to interpret conceptually. The problem of interpreting the results has remained a challenging task for the data analyst. In addition, traditional classification-building methods describe objects by attribute value sequences and therefore are inadequate for creating classifications of structured objects. The description of such objects must involve not only attributes of objects as a whole but also attributes of object components and relationships among these components.