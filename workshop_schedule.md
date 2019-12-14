Draft workshop for Aarhus + presentation;

   * two themes:

   * concepts on distance in machine learning and anatomy. what is a unit of anatomical distance? what different topologies of geometries; directionality could we accomodate? Position and orientation.

   distance is the moment of judjement.

   * dimensionality reduction: we have 72 tags/dimensions and we reduce to 2D (x+y) euclidean distance always reduces to one numer (distance from the entrance to the centroid)


   30min: intro who we are; explain the project; why anatomy; why ML;
   2.15 hour: exercise

   15min) on the floor exercise: https://github.com/anatomiesofintelligence/anatomiesofintelligence.github.io/blob/master/anatomies_exercise.md;


   30min) introduce ML; distances + dimensionality reduction. K-means as focus: first sudo code; and then we read our own algorithm; https://github.com/anatomiesofintelligence/anatomiesofintelligence.github.io/blob/master/workshop_presentation.html


   30 min) catalog demo and collective reading of the clustering algorithm; explain the concepts of distance and dimentionality reduction (mainly necessary for vizualization; though essentialy this algorithms are already reducing dimensionalities). — > "help()"


   Demo catalogue and algorithm:

   catalog.cluster(CLUSTERS, MEASUREMENT, cut, ITERATIONS, resultfunc, BREAKPOINTS, osc, console.log);

   catalog.cluster(2, Measures.euclidean, CUT, 3 , resultfunc, osc, console.log)


   CLUSTER = 2

   MEASUREMENT = Measures.euclidean

   CUT = ["anatomy", "theatre", "actors"]

   ITERATIONS = 3


   1hour) exercise IRL clustering interface:

   30 min) in groups clustering: 20 or more entries in their dataset — toy dataset (MNIST / image dataset)


   in groups, briefly analize and discuss your dataset; then follow the four main tasks bellow:


   * distance (or the concept of difference);

   How do we deal with temporality? (there is a before and after;)

   Choose a measurement system. Discuss notion a round distance (idea of difference?);

   How do we deal with temporality? (there is a before and after;)

   What measurements and distances could be used?

   Consider existing methods, but also scales and orientations for observation, affective response & affinity.                             

   Questions:

   is your notion of ditance multi-dimensional?

   what are its dimensions?

   collect examples and ideas around the notion of "distances"; which ones to consider?

   measurement systems that are used in learning algorithms (for eg.: the euclidean is a popular one; cost and error functions; measures for knowing if you are converging; cross entropy — decides if the algorythm is learning or not); explore alternative distance measurements for example inspired in anatomical practices or in other systems/ conventions (cm..) — option to leave for workshop brainstroming;


   * tagging and weights (give values to data samples);


   * representation of the knowledge system / communicate the process and results

   how to visualize the clustering?

   consider dimensionality reduction (in each what preserves and what is left out);

   *different layers:

   * from tags (processual happening on the data collection);

   * projections (vizualization);

   * sonification; which other senses can take part?


   * cluster: execute k-means and document the results;

   catalog.cluster(2, Measures.euclidean, CUT, 3 , resultfunc, osc, console.log)

   optional: Use the console/javascript api as an observational tool <-- provide commands catalog.cluster(3, Measures.euclidean, ["model", "aesthesis", "categorization", "body"], 10, resultfunc, false) https://anatomiesofintelligence.github.io/theatre/kmeans


   30min) optional: experiment the process with another dataset / with different measurement systems; parameters; define a another cluster;...;

   Analyze the algorithm; further discuss / make a list of potential entry points for performativity, presentation, critical intervention, aesthetic intervention within this algorithm.


   15min: break

   30min: group presenations

   30min: wrapping up and 
