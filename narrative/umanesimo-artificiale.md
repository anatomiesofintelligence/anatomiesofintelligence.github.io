```diff
- text in red
+ text in green
! text in orange
# text in gray
@@ text in purple (and bold)@@
```

# Pre-Stage

__Waiting Room — Ideas__

* body measuring ritual: warming up for the anatomic journey;

* chatroom as whisper;

* the anatomist and the anatomized body.

<p style="color:gray">voice snippets</p>

Welcome to the Anatomies of Intelligence waiting room. You will be soon taken on a an anatomic journey. — > voice repeats like in waiting rooms;

How is your body feeling today? Feel the weight and lightness of you body; pressing the surrounding surfaces; the limits between surfaces.
Make space between you and other in the room; 
Choose one part of your body, and slowly rotate around the different axis.
Most terms of anatomical location are relative to linear motion (translation) along the X- Y- and Z-axes, 
but there are other degrees of freedom as well, in particular, rotation around any of those three axes.
Take a deep breath.

Welcome to the Anatomies of Intelligence waiting room. You will be soon taken on a an anatomic journey.

Breathe in and out. Breathing is the bridge between the voluntary and involuntary — the sympathetic and the parasympathetic nervous system; 
the conscious and the unconscious; the inner and the outer. Activate the circulation.
Inhalation (contract the abdomen) > Retention (3-5sec) > Exhalation (expand the abdomen);
Breathing deeply helps circulation and oxygenation of the brain. Airstreams, generative circulation;
The brain is irrigated by 2000 liners of blood everyday and this blood passes through many miles of capillaries.
You are part of a vast circulatory network; which connects organs, functions, enactments.
Who else is breathing in the room?

Welcome to the Anatomies of Intelligence waiting room. You will be soon taken on a an anatomic journey.

Feel the distance and proximity between you and other in this room. 
Proximal in anatomy is the nearest organ to another one, like your cornea in your left eye. 
Inter- (from Latin inter, meaning 'between'): between two other structures, such as the intercostal muscles running between the ribs.
The location of anatomical structures, like a mapping exercise, can be described with relation to different anatomical landmarks. 
Here the relationship is based on euclidean distancing: measuring the distance between each entry; 
while having no sense of direction nor orientation.
Stretch your arms, do you touch someone?

We are now ready to enter the main stage, the anatomic theatre. A few important rules to follow:

By mindful of other bodies in the room, move quietly and slowly to avoid echoing;
Remember to continue breathing.

# on Stage

## Phase 01: the dataset;

__notes on narrative__

* audience introduced to the actors in the networks; 

<p style="color:blue">on style</p>

* entries display as list or grid;

* entries display are spatialised;

<p style="color:pink">code</p>

* catalog.allEntries //full list of entries

<span style="color:gray">voice snippets</span>


* read list of entries;


## Phase 02: clustering beggins;

__notes on narrative__

* introduction to the algorithm;


K = 3 //K-number of clusters

<span style="color:pink">code</span>

MEASUREMENT = Measures.euclidean //measurement metric

ITERATIONS = 5 //number of K-means iterations

PROJECTION_DIMENSIONS = ["cutting", "measurement"]

catalog.cluster(3, Measures.euclidean, ["cutting", "measurement"], 10, resultfunc, true, OSC_OUT, console.log);

<span style="color:gray">voice snippets</span>

Starting with a simple gesture: cutting. To cut open, to examine, in order to describe each organ and identify their functions, while discovering its relations to the whole — from organ to organisation, organicity. The begginings of exploring a vast circulatory network circumventing anatomical locations which connects functions and enactments. Some call it an empirical system to perform systematic dissection of the human body.
Learning the best techniques to dissect the body to effectively observe each muscle and how the body is laid out. Learning from each cut, hands-on, a humid sensation activates the smells in the room.
Aesthesis or “the faculty or power of sensation” was often used to describe scientific practices in eighteenth-century European medical and philosophical dictionaries. "Laying bare and learning about the inner structures of the human body, was best done through the use of one’s own hands and eyes. (...) However, although the hand and the eye were indeed considered to be the anatomists’ most important instruments, all senses, including smell, taste, and hearing were involved in the practice of anatomy."

## Phase 03

__notes on narrative__

* the viewpoint of a node in the network;

* the ex-negativo; the outlier; the monster;

<span style="color:gray">voice snippets</span>

In the past demonstrations were usually spread over several days, and limited to the winter months, in an unheated room facing northward to keep the sun out. 
These measures are no longer necessary. In the air there no longer lingers a smell of incense. There is no, far stronger, smell of rot. 
Although we still attempt to start with the most perishable parts of the corpus. There is still something unnerving, and unpleasant.

Dealing with the disgusting insides of the body and with severed body parts is, of course inevitable for anatomists. 
Paradoxically, is is also a manner in which to gain access to knowledge about the beauty and perfection of a data corpus. Can you imagine? 
That under all the bloody bias there is indeed something of profound beauty?

The majority of anatomical preparations in the collections of the 18th-century Leiden anatomists appear to be predominantly examples of normal - 
or even perfect - human anatomy, prepared in such a way that they convey the aesthesis of anatomy. 
This aesthesis is the result of particular yet tacit ideas of beauty, perfection and elegance. 
Most of the body parts were chosen for these preparations because they were already in themselves perfect specimens: there are no obvious pathologies, 
and most of them were (part of) young, lean, healthy bodies. Yet ultimately, they remain severed body parts on the brink of decay - the ultimate emblem of disgust.

As this early Enlightenment-era anatomy developed, the study of pathology and abnormalities became increasingly important, and a new aesthesis of monstrosities emerged. 
An aesthesis of the ugly and the imperfect. An aesthesis ex negativo.

Pathological specimens like these appear often and are of great interest. They are the statistical outliers that in some cases break the model's delicate facia. 
But in most cases, they force a rethinking of the model's effectivity and are subsumed by it, reinforcing the model's power as a knowledge. 
By preserving monstrocities in preparations, the immediate danger implied by the visceral disgust such specimines provoke is averted. 
Instead, we shape them into didactic instruments and purveyors of meaning.

## Phase 04: ending of clustering; leaving the space.

The anatomist and the anatomized body. Iteration over iteration, calculating distances cutting across various lengths. 
Performing a series of dissections, cutting through corpses, data, our anatomic dataset collection. 
Classified objects of knowledge, a new collection is born.

Projections.SIMPLE2D //entries are projected in 2D using one feature per axis Projections.RADIUS //entries arranged radially around centroids
project(Projections.SIMPLE2D)
clean_surface()
