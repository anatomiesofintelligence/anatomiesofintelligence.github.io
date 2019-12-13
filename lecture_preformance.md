# Performing the AoI Catalogue {in progress}

<!---
function openReferences () {
window01 = window.open("", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=5,left=1,width=400,height=900");
window02 = window.open("", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=25,left=100,width=1400,height=90"); 
window03 = window.open("https://anatomiesofintelligence.github.io/posts/2019-06-21-ontology-building", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=1000,left=100,width=400,height=100"); 
}
function openReferences () {
    window01.close();
    window02.close();  
    window03.close();
}
or thematic clustering: 
catalog.cluster(2, Measures.euclidean, ["theatre", "aesthesis", "spectacle"], 10, resultfunc, false)
-->

- - - - Joana - - -  -

## Aesthesis

**catalog.cluster(3, Measures.euclidean, ["elegance", "aesthesis"], 20, resultfunc, true, OSC_OUT, console.log);**

**TEMPO = 0.5**

**project(Projections.SIMPLE2D)**

* [The Concept of Aesthesis](https://anatomiesofintelligence.github.io/posts/2018-10-14-aesthesis-elegant-anatomy)
_openEntry("the-concept-of-aesthesis")_

> "Aesthesis in eighteenth-century anatomy was characterized by several factors: gaining knowledge through sensory perception; searching for perfection and elegance; dealing with disgust by either using visual or literary strategies; seeking systems and meanings in the negatives of deformation and pathologies; and a stabilization and categorization of the human body through commodification and decoration." Source: Elegant Anatomy, The Eighteenth-Century Leiden Anatomical Collections. Marieke M. A. Hendriksen (2015)

[Joana]  notes on artistic research method: concept of aesthesis/ aesthesia  / reliance on the senses / performance and performativy: a live and embodied  but also rule-based practice of ontology-making; rethinking and experimenting with scales and orientations for observation, affective response & affinity - and how such observations can be performed / presented as intimate / tacit understanding; endless practice, through trial and error, with hands-on work..

> The concept of “aesthesis” has been especially useful in shaping our work; aesthesis is a somewhat obscure term occurring in eighteenth-century European medical and philosophical dictionaries describing “the faculty or power of sensation” in scientific practice. Our concept of aesthesis shapes a methodology for this project that looks at the “sensory power” displayed by machine learning algorithms, their representations and sets of training data. Our aim is to engage with different modes of performativity by which these aesthetics emerge, experimenting with different orientations for observation and knowing, and creating a specific vocabulary for our methods based in an anatomical arrangement of parts and systems.

* [Elegant Anatomy book as training set input](https://anatomiesofintelligence.github.io/posts/2018-10-31-ML-Algolit-ElegantAnatomy) _openEntry("elegant-anatomy-book-as-training-set-input")_

> This catalog is a living research document into the history and present of anatomical science, as well as “anatomies” of artificial intelligence algorithms and data stewardship practices.


## Gestures of — Collection and Preparation

**clean_surface()**

**catalog.cluster(3, Measures.euclidean, ["preparation", "collection"], 20, resultfunc, true, OSC_OUT, console.log);**

**project(Projections.SIMPLE2D)**

* [Ontology Building](https://anatomiesofintelligence.github.io/posts/2019-06-21-ontology-building) _openEntry("ontology-building")_

> The catalogue is also itself a reflection on the process by which collections of anatomical specimens were constructed in the formative decades of European/Western anatomical science. By collecting our research exemplars as a demonstrable archive, we attempt to explore the process of preparation and collection that reifies a collection of information into a body of knowledge, a collection that can be consumed and an ontology created. 

* [Read: God's Work](http://anatomiesofintelligence.github.io/posts/2018-10-16-the-fate-of-anatomical-collections-part3-7-3) _openEntry("god-s-work-early-17th-century-epistemology")_

* [Image: Human-Myth](https://anatomiesofintelligence.github.io/posts/2019-09-24-Human-Myth) _openEntry("human-proportions-established-through-mythological-figures")_

> "How could this kaleidoscopic ensemble, in which skeletons and anatomical preparations accounted for only a relatively small share compared to the vast bulk of naturalia and artificialia, have functioned in combination with the anatomical demonstrations and instruction that also took place at this location? Anatomy in the early seventeenth century can be considered an investigation by means of the fabric of the dead human body into the essence of the human being, namely the evidence it shows of God’s in nite wisdom and providence. Man – the pinnacle of Creation – is the most perfect example of God’s work in the world."


- - - - Jonathan - - -  -


* [Image: Leiden Preparations](https://anatomiesofintelligence.github.io/posts/2018-10-16-leiden-preparations) _openEntry("collection-of-anatomical-preparations")_

* [Image: Botanical and zoological Preparations](https://anatomiesofintelligence.github.io/posts/2019-12-6-botanical_preparations) _openEntry("thesaurus-botanical-preparations")_

* [Read: Commodification](https://anatomiesofintelligence.github.io/posts/2018-10-29-domestication-elegant-anatomy) _openEntry("tactile-processes-of-commodification")_

> "…aesthesis in anatomy is inevitably characterized by the very tactile processes of commodification, domestication and objectification: it involves the creation of lasting, transferable anatomical preparations that both represent and are made of parts of the human body, as well as the domestication of the (exotic) other." Footnote: Latour, Science in Action, 223.

Mention the colonial frame around the trading of anatomic pieces; Also botany and the naturalist as closely related sciences - a mention here of 18th century anatomy, doingGod's work and the exotic;

Agents and agencies: anatomic preparations — models and its users: anatomists and teachers, curators and audiences mapping presences and the absences;

> "The term "k-means" was first used by James MacQueen in 1967 as part of his paper on "Some methods for classification and analysis of multivariate observations". The standard algorithm was also used in Bell Labs as part of a technique in pulse code modulation in 1957. It was also published by In 1965 by E. W. Forgy and typically is also known as the Lloyd-Forgy method."

* [Image: cluster analysis results](https://anatomiesofintelligence.github.io/posts/2018-10-16-expectation-maximization-algorithm) _openEntry("expectation-maximization-algorithm-vs-k-means-clustering”)_

* [Image: adding to a classification tree](https://anatomiesofintelligence.github.io/posts/2019-06-21-adding-concepts-to-existing-classification-tree) _openEntry("adding-mammal-and-bird-to-an-existing-classification-tree”)_

Theory: Can we rethink clusering as collecting? A clustering, an ontology created, as a cabinet of curiosities.


- - - - Joana - - -  -



## The Gesture of — cutting;

**clean_surface()**

**catalog.cluster(3, Measures.euclidean, ["cutting", "measurement"], 20, resultfunc, true, OSC_OUT, console.log);**

**project(Projections.SIMPLE2D)**

> We start with a simple gesture: cutting. To cut open, to examine, in order to describe each organ and identify their functions, while discovering its relations to the whole — from organ to organisation, organicity. Some call it an empirical system to perform systematic dissection of the human body. 

* [Image: Dissection - 14th century](https://anatomiesofintelligence.github.io/posts/2019-12-6-dissection) _openEntry("dissection-of-a-male-cadaver”)_

* [Image: Dissection with Spectators](https://anatomiesofintelligence.github.io/posts/2019-12-6-dissection-anatomical-7-observers) _openEntry("the-dutch-anatomist-steven-blankaart-1650-1704-performing-a-dissection-in-an-anatomy-theatre-with-seven-observers-engraving-1687”)_

> Learning from each cut, driven by curiosity and the desire to see beyond the surface level, the skin, pourous, our primary interface to the world. Inter-facing scores and scripts, inter-, in between gestures and codes. 

* [Image: Horizontal section through brain](https://anatomiesofintelligence.github.io/posts/2019-09-2-Horizontal-section-brain) _openEntry("horizontal-section-through-brain”)_


- - - - Jonathan - - -  -


A slice into multidimensional space

* [Curse of Dimensionality](https://anatomiesofintelligence.github.io/posts/2019-12-8-curse-of-dimensionality) _openEntry("curse-of-dimensionality”)_

> Like a mapping exercise. The location of anatomical structures can be described with relation to different anatomical landmarks. Here the relationship is based on euclidean distancing: measuring the distance between each entry; while having no sense of direction nor orientation. 

* [Image: Observations on the Muscles Fibres](https://anatomiesofintelligence.github.io/posts/2019-09-24-Muscles-Fibres) _openEntry("observations-on-the-muscles-blane-gilbert-sir-1749-1834”)_

* [Image: Skulls Proportions](https://anatomiesofintelligence.github.io/posts/2019-09-24-Skulls-Profiles) _openEntry("skulls-1824”)_

> The anatomist and the anatomized body. Iteration over iteration, calculating distances cutting across various lengths.

* [Image: Euclidean Distance](https://anatomiesofintelligence.github.io/posts/2019-09-24-Euclidean_Distance) _openEntry("euclidean-distance-in-r2”)_

* [Image: PCA Projection of Spherical Cloud](https://anatomiesofintelligence.github.io/posts/2019-12-8-principal-component-analysis-2D-fitting) _openEntry("principal-component-analysis-2d-dimensions”)_

* [Image:  Acu-moxa aid, landmark measurements, Chinese MS, late Qing](https://anatomiesofintelligence.github.io/posts/2019-09-24-Landmark-Body-Chinese) _openEntry("acu-moxa-aid-landmark-measurements-chinese-ms-late-qing”)_

* [Image: Anatomy Planes](https://anatomiesofintelligence.github.io/posts/2019-09-24-Human-Anatomy-Planes) _openEntry("human-anatomy-planes-2014”)_

* [K-means evaluation strategies](https://anatomiesofintelligence.github.io/posts/2019-06-21-kmeans-initialization-strategies) _openEntry("k-means-initialization-strategies”)_

## The Theatre & the Spectacle: _Staging Bodies of AI_ 

**clean_surface()**

**catalog.cluster(3, Measures.euclidean, ["theatre", "spectacle"], 20, resultfunc, true, OSC_OUT, console.log);**

**project(Projections.SIMPLE2D)**

* [Image: Anatomical Theatre Leiden](https://anatomiesofintelligence.github.io/posts/2018-10-14-anatomical-theatre-leiden-engraving
) _openEntry("copperplate-engraving-of-anatomical-theatre-leiden-1615”)_
* [Image: Anatomical Theatre — replica](https://anatomiesofintelligence.github.io/posts/2018-10-16-leiden-anatomical-theatre-replica-boerhaave) _openEntry("replica-anatomical-theatre-leiden-1594”)_
* [Read: Anatomical Theatre — collections](https://anatomiesofintelligence.github.io/posts/2018-10-16-the-fate-of-anatomical-collections-intro) _openEntry("an-empirical-description-of-the-leiden-anatomical-theatre”)_

> “Leiden’s anatomy hall is a brick building, the exterior of which looks quite unprepossessing. Inside one finds two theatres – or ‘snykammer’ as the Dutch call them – for anatomical demonstrations: a public one and a private theatre. … In the latter various glass cases contain the excellent anatomical preparations of Dr Rau … next to that one sees the portrait of Solingen, and the famous knife swallower, the head of an elephant, and three mummies.” _Source: The Fate of Anatomical Collections Rina Knoeff, Robert Zwijnenberg. Ashgate Publishing Company (2015)_

<!---
* knife swallower = spectacle; GANS / neural networks; anthropomorphizing / animism for the rich;
* the head of an elephant = knowledge ontology; the opressive force;
* three mummies = three zombies of AI: anacronistic; no longer valid; living myths;
-->

Performing a series of dissections, cutting through corpses, data, our anatomic dataset collection. Classiffied objects of knowledge, a new collection is born.

Can we explicitly also address the role of the emerging phenomenon of the European University to the positions of the Leiden anatomists?


- - - - Joana - - -  -


* [Read: on Perfection](https://anatomiesofintelligence.github.io/posts/2019-12-4-collections-of-perfection) _openEntry(“collections-of-perfection”)_

> "For the Leiden anatomists Rau, Albinus, Van Doeveren, Bonn and Brugmans perfection was at the core of their decisions. Aesthetically, the objects had to be presented according to fixed proportions, perspectives and other aesthetic conventions. Technologically and scientifically, the anatomical collections were aimed at showing ever more perfect methods of revealing and preserving nature. Ethically, the collections functioned like mirrors and helped in the educational and therefore ethical perfectibility of man. There was even a theological meaning of perfection as some collectors sought to represent the perfect order of creation. Also the exhibition of so called ‘monsters’, tumours and other malformations were meant to enhance (ex-negativo) the image of the perfect body."

* [An Aesthesis ex-Negativo Emerged](https://anatomiesofintelligence.github.io/posts/2018-11-6-aesthesis-negativo) _openEntry(“an-aesthesis-ex-negativo-emerged”)_

> "So far, the preparations from the eighteenth-century Leiden anatomical collections appear to be predominantly examples of normal - or even perfect - human anatomy, prepared in such a way that they convey the aesthesis of anatomy. The result of particular yet tacit ideas of beauty, perfection and elegance, most of the body parts were chosen for these preparations because they were already in themselves perfect specimens: there are no obvious pathologies, and most of them were (part of) young, lean, healthy bodies. (…) Yet ultimately, severed body parts on the brink of decay - the ultimate emblem of disgust — are the constituents of this collection, and as in the course of the eighteenth-century research into pathology and abnormalities became increasingly important, an aesthesis ex negativo emerged: an aesthesis of the ugly and the imperfect."

* [Freakish Incidents or Devil's Work or Unknown Categories](https://anatomiesofintelligence.github.io/posts/2018-11-6-preserving-monstrocities) _openEntry(“preserving-monstrosities”)_

> "By preserving monstrosities like these in preparations, and averting the immediate danger implied by the visceral disgust such specimens would provoke unpreserved, their makers shaped them into didactic instruments and purveyors of meaning." 

* [Image_ Parts of a Monster](https://anatomiesofintelligence.github.io/posts/2019-12-6-monster_instruments) _openEntry(“parts-of-a-monster-and-instruments”)_

> The catalogue interface is our platform to explore, through performance, how such a collection and an artisanal algorithmic toolkit can confront the idealized bodies of artificial intelligence — its fixed representational structures and opaque learning processes. 


- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Joana's test reading time w/ pauses = ? min total
