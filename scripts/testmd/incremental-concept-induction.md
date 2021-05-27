---
copyright: ''
entry-by: Jonathan Reus
entry-date: '2019-06-21'
entry-type: ''
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
feature_values: ['', '0', '0.89', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0.12',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0.34', '0', '0',
  '0', '0', '0.1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0.862', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0.2', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0.87', '0', '0', '0', '0', '0', '0',
  '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0',
  '']
filename: incremental-concept-induction.md
image: ''
layout: text
source: Fisher, Douglas H. "Knowledge acquisition via incremental conceptual clustering."
  Machine learning 2.2 (1987) 139-172.
source-url: https://link.springer.com/article/10.1023%2FA%3A1022852608280
summary: Proposal for incremental concept induction algorithms towards creating statistical
  ontologies. Excerpt from 1987 COGWEB publication by Douglas Fisher.
title: Incremental Concept Induction
---

## Incremental concept induction
Many concept learning systems, whether they carry out learning from examples or conceptual clustering, are non incremental - all objects must be present at the outset of system execution.

In contrast, incremental methods accept a stream of objects that are assimilated one at a time. A primary motivation for using incremental systems is that knowledge may be rapidly updated with each new observation, thus sustaining a continual basis for reacting to new stimuli. This is an important property of systems that are used under real-world constraints (Carbonell &; Hood, 1986; Langley, Ki-bler, & Granger, 1986; Sammut & Hume, 1986).

Search-intensive methods may be appropriate in a non-incremental system, but may be too costly for incremental processing, since they require updating a frontier of concept hypotheses and/or examining a list of previously seen objects. Schlimmer and Fisher (1986) imply that incremental processes are profitably viewed as strategies operating under diminished search control. Specifically, they use a hill-climbing strategy (with no backtracking) to implement and test incremental variants of Quinlan's (1983) ID3 program. Schlimmer and Fisher demonstrate that the cost of object incorporation can be significantly reduced, while preserving the ability of the learning system to converge on concept descriptions of high quality. The ability to achieve high quality concept descriptions, despite the limitations of hillclimbing, is maintained by extending the set of available operators. Rather than restricting search to be unidirectional, both generalization and specialization operators are supplied. Bidirectional mobility allows an incremental system to recover from a bad learning path.In learning from examples, Winston's (1975) 'ARCH' program fits this view of incremental processing; it employs a hill-climbing strategy with operators for both generalization and specialization. This view can also be extended to conceptual clustering. For instance, Fisher and Langley (1985,1986) view Lebowitz' (1982, 1986a) UNIMEM as an incremental conceptual clustering system. Given a new object and an existing hierarchy that was built from previous observations, the program incorporates the object into the hierarchy. This results in a classification hierarchy that covers the new object as well as previously seen objects. Since UNIMEM maintains only one hierarchy following each observation, it can be viewed as hill climbing through a space of classification hierarchies. Second, UNIMEM does not build its hierarchies in an entirely top-down or bottom-up fashion. Instead, it has operators for merging nodes in an agglomerative manner and deleting nodes and associated subtrees. Node deletion selectively undoes the effects of past learning and thus approximates backtracking.

While existing descriptions of UNIMEM and similar systems like CYRUS (Kolodner, 1983) are not framed as search, desirable search properties can be abstracted  from them.  These systems use diminished search control and greater operator flexibility to navigate through hierarchy space, and thus employ a practical strategy for incremental learning. The advantage of viewing these systems in terms of search is that it requires explicit consideration of the 'goal' of learning and of the system's ability to achieveor approximate this goal.  The search framework forces analysis to move beyond anecdotal characterizations of system behavior.3. COBWEB: Incremental conceptual clusteringUNIMEM and CYRUS, along with the conceptual clustering work of Michalski and Stepp, have inspired the COBWEB system.  COBWEB is an incremental system for hierarchical conceptual clustering. The system carries out a hill-climbing search through a space of hierarchical classification schemes using operators that enable bidirectional travel through this space. This section describes COBWEB, filling in the details of the general incremental strategy.  Specifically, the section gives•  the heuristic evaluation measure used to guide search,•  the state representation, including the structure of hierarchies and the representation of concepts,•  the operators used to build classification schemes, and•  the control strategy, including a high level description of the system.

### 3.1 Category utility:  A heuristic evaluation measure
COBWEB uses a heuristic measure called category utility to guide search. Gluck and Corter (1985) originally developed this metric as a means of predicting the basic level in human classification hierarchies. Briefly, basic level categories (e.g., bird) are retrieved more quickly than either more general (e.g., animal) or more specific (e.g., robin) classes during object recognition. More generally, basic level categories are hypothesized to be where a number of inference-related abilities are maximized in humans (Mervis & Rosch, 1981). Identifying preferred concepts in humans is important from a cognitive modeling standpoint, but it also provides a basis for developing principled criteria for evaluating concept quality in AI systems. Category utility can be viewed as a function that rewards traditional virtues held in clustering generally - similarity of objects within the same class and dissimilarity of objects in different classes. In particular, category utility is a tradeoff
146D. H. FISHER between intra-class similarity and inter-class dissimilarity of objects, where objects are described in terms of (nominal) attribute-value pairs...