---
title: Conceptual Clustering
subtitle:
layout: text
entry-by: Jonathan Reus
entry-date: 2019-06-21
source-url: https://dl.acm.org/citation.cfm?id=1625057
source: Stepp, Robert E., and Ryszard S. Michalski. "Conceptual clustering- Inventing goal-oriented classifications of structured objects." 1986.
copyright:
tags: [clustering, conceptual-clustering, concept, ontology-building, unsupervised, statistical-ontology]
weights: [0.90, 1.0, 0.88, 0.67, 0.44, 0.23]
summary: ""
---
Creating a classification' is typically the first step in developing a theory about a collection of observations or phenomena. This process is a form of learning from observation (learning without a teacher), and its goal is to structure given observations it to a hierarchy of meaningful categories. The problem of automatically cre- ating such a hierarchy has so far received little attention in AI.

Yet creating classifications is a very basic and widely practiced intellectual process.
Past work on this problem was done mostly outside AI under the headings of numerical taxonomy and cluster analysis (Anderberg, 1973). Those methods are based on the application of a mathematical measure of similarity between objects, defined over a finite, a priori given set of object attributes. Classes of objects are taken as collections of objects with high intraclass and low interclass similarity. The methods assume that objects are characterized by sequences of attribute/value pairs and that this information is sufficient for creating a classification. The methods do not take into consideration any background knowledge about the semantic relationships among object attributes or global concepts that could be used for characterizing object configurations. Nor do they take into consideration possible goals of classification that might be indicated by background knowledge.

As a result, classifications obtained by traditional methods are often difficult to interpret conceptually. The problem of interpreting the results has remained a challenging task for the data analyst. In addition, traditional classification-building methods describe objects by attribute value sequences and therefore are inadequate for creating classifications of structured objects. The description of such objects must involve not only attributes of objects as a whole but also attributes of object components and relationships among these components.
