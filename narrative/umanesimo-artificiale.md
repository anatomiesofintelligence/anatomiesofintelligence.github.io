<!---
```diff
- text in red
+ text in green
! text in orange
# text in gray
@@ text in purple (and bold)@@
```
-->

# Pre-Stage: Waiting Room


```diff
# notes narrative:
```

* body measuring ritual: warming up for the anatomic journey;
* chatroom quiet, whispering;

```diff
- record voice: export mp3 mone 32kb; force export to mono; constant bitrate (quality); variable speed standard;
```

* Welcome to the Anatomies of Intelligence waiting room. You will be soon taken on a an anatomic journey. // — > voice repeats like in waiting rooms;

* How is your body feeling today?
Feel the weight and lightness of your body. Choose one part of your body, and slowly rotate around the different axis.
Most terms of anatomical location are relative to linear motion, for example translation along the X- Y- and Z-axes, continue slowly rotating. 
Take a deep breath.
How is your body feeling today? Write down, and share a few words. 

* Welcome to the Anatomies of Intelligence waiting room. You will be soon taken on a an anatomic journey.

* Breathe in and out. Breathing is the bridge between the voluntary and involuntary — the sympathetic and the parasympathetic nervous system; 
the conscious and the unconscious; the inner and the outer. 
Inhale (contract the abdomen) > Retain  for 3 to 5sec > Exhale (expand the abdomen);
Breathing deeply helps circulation and oxygenation of the brain. Airstreams, generative circulation;
The brain is irrigated by 2000 liners of blood everyday and this blood passes through many miles of capillaries.
You are part of a vast circulatory network; which connects organs, functions, enactments.
Who else is breathing in the room? Write us a few words to introduce yourself from the viewpoint of one of your organs.

* Welcome to the Anatomies of Intelligence waiting room. You will be soon taken on a an anatomic journey.

* Feel the distance and proximity between you and other bodies in this room.
Proximal in anatomy is the nearest organ to another one, like your cornea in your left eye. 
Inter- (from Latin inter, meaning 'between'): between two other structures, such as the intercostal muscles running between the ribs.
The location of anatomical structures, like a mapping exercise, can be described with relation to different anatomical landmarks. 
Here the relationship is based on euclidean distancing: measuring the distance between each entry; 
while having no sense of direction nor orientation.
Stretch your arms, did you touch someone? This is a tight room, write us if you feel soreness or pain in your body, we will avoid close contact.

* We are now ready to enter the main stage, the anatomic theatre. A few important rules to follow: be mindful of other bodies in the room, move quietly and slowly to avoid echoing. Remember to continue breathing.

# on Stage

## Phase 01: The Dataset;


```diff
# notes narrative:
```

* audience introduced to the points in the dataset/ actors in the networks; 


```diff
@@ code@@
```
* room_wire.visible = false
* floor_wire.visible = false
*  document.getElementsByTagName("a").style.color="#d8d8d8";
  * document.querySelectorAll(".refs > a").style.color="#d8d8d8";
* sun.intensity=0.6 (arrive in a dark space, light slowly inscreases)
* entries display as list or grid;
  * document.querySelectorAll(".refs").style.position="relative"; 
  * document.querySelectorAll(".refs").style.transform="none"; 
  * document.querySelector("body").style.display="grid"; 
  * document.querySelector("body").style.gridTemplateColumns="auto auto auto auto"; // grid-auto-rows: 150px;
* entries display are spatialised;
* room_wire.visible = true
* let moveit = setInterval(function(){ camera.rotateX(0.1)},500); 
* clearInterval(moveit)
* floor_wire.visible= true

* catalog.allEntries // full list of entries

```diff
- record voice:
```

* [read list of all entries;](https://github.com/anatomiesofintelligence/anatomiesofintelligence.github.io/blob/master/narrative/all-tags.md)


## Phase 02: Clustering Beggins;


```diff
# notes narrative:
```

* introduction to the algorithm;
* the anatomist and the anatomized body.


```diff
@@ code@@
```

__IMMEDIATE CLUSTER__

* K = 3 //K-number of clusters
* MEASUREMENT = Measures.euclidean //measurement metric
* ITERATIONS = 5 //number of K-means iterations
* PROJECTION_DIMENSIONS = ["cutting", "measurement"]
* catalog.cluster(3, Measures.euclidean, ["cutting", "measurement"], 10, resultfunc, true, OSC_OUT, console.log);

* Projections.SIMPLE2D //entries are projected in 2D using one feature per axis Projections.RADIUS //entries arranged radially around centroids
* project(Projections.SIMPLE2D)

* background-image: url(".png"); // image of cutting table;

```diff
- record voice: when we define the culstering MISSING IMPORTANT
```

* We now need your attention please; read step by step aspects of the algorithm;


```diff
- record voice:
```

* Starting with a simple gesture: cutting. To cut open, to examine, in order to describe each organ and identify their functions, and discover its relations to the whole — from organ to organisation, organicity. These are the begginings of exploring a vast circulatory network circumventing anatomical locations which connects functions and enactments. Some call it an empirical system to perform a systematic dissection of the human body.

* Learning the best techniques to dissect the body, to effectively observe each muscle and how the body is laid out. Learning from each cut, hands-on, a humid sensation activates the smells in the room.

* Aesthesis or “the faculty or power of sensation” was often used to describe scientific practices in eighteenth-century European medical and philosophical dictionaries. "Laying bare and learning about the inner structures of the human body, was best done through the use of one’s own hands and eyes. (...) However, although the hand and the eye were indeed considered to be the anatomists’ most important instruments, all senses, including smell, taste, and hearing were involved in the practice of anatomy."


# Phase 03: Clustering Slow Motion;

* voice dialog / now we make this process at a human scale
* stretching it out in time and space
* begin new clustering (interactive mode - features to be chosen ... cutting & measurement )

* catalog.cluster(3, Measures.euclidean, ["cutting", "measurement"], 10, resultfunc, true, OSC_OUT, console.log);

  
```diff
- record voice:
```

* In the past demonstrations were usually spread over several days, and limited to the winter months, in an unheated room facing northward to keep the sun out. 
These measures are no longer necessary. In the air there no longer lingers a smell of incense. There is no, far stronger, smell of rot. Although we still attempt to start with the most perishable parts of the corpus. There is still something unnerving, and unpleasant.



## Phase 04: PAUSE: Viewpoints — the outlier;

```diff
# notes narrative:
```

* The viewpoint of a node in the network;
* The ex-negativo; the outlier; the monster;

```diff
@@ code@@
```

* document.querySelectorAll(".refs").style.visibility="hidden";

* open pop-ups code, select entries:
  * #encephalitis-specilegium-anatomicum
  * #monster_instruments
  * #collections-of-perfection
  * #aesthesis-negativo

* add distinct style to div  — box-shadow? (aesthesis-negativo);
  
```diff
- record voice:
```

* Dealing with the disgusting insides of the body and with severed body parts is, of course, inevitable for anatomists. 
Paradoxically, is is also a manner in which to gain access to knowledge about the beauty and perfection of a data corpus. 
Can you imagine, that under all the bloody bias there is indeed something of profound beauty?

* The majority of anatomical preparations in the collections of the 18th-century Leiden anatomists appear to be predominantly examples of normal - or even perfect - human anatomy, prepared in such a way that they convey the aesthesis of anatomy. 
This aesthesis is the result of particular yet tacit ideas of beauty, perfection and elegance. 
Most of the body parts were chosen for these preparations because they were already in themselves perfect specimens: there are no obvious pathologies, and most of them were (part of) young, lean, healthy bodies. Yet ultimately, they remain severed body parts on the brink of decay - the ultimate emblem of disgust.

* As this early Enlightenment-era anatomy developed, the study of pathology and abnormalities became increasingly important, and a new aesthesis of monstrosities emerged. An aesthesis of the ugly and the imperfect. An aesthesis ex negativo.

* Pathological specimens like these appear often and are of great interest. They are the statistical outliers that in some cases break the model's delicate facia. 
But in most cases, they force a rethinking of the model's effectivity and are subsumed by it, reinforcing the model's power as a knowledge. By preserving monstrocities in preparations, the immediate danger implied by the visceral disgust such specimines provoke is averted. Instead, we shape them into didactic instruments and purveyors of meaning.

* All deceiving measurements, the distance between the perfect and the imperfect, from worship to disgust and reverse. Far away coming closer, cutting through perceptual fields, blending in. We initiate a new path, we follow the shadow, the unwanted and the most wanted, the outlier, the monster, and the sublime.


# Phase 05: End;

```diff
# notes narrative:
```

* ending of clustering; 
* leaving the space.

```diff
@@ code@@
```

* floor_wire.visible=false
* Projections.RADIUS //entries arranged radially around centroids
* project(Projections.Raduis)
* clean_surface() 
* sun.intensity=0.6 (fade in dark space)

```diff
- repeat voice:
```

* The anatomist and the anatomized body. Iteration over iteration, calculating distances cutting across various lengths. 
Performing a series of dissections, cutting through corpses, data, our anatomic dataset collection. Classified objects of knowledge, a new collection is born.

* [read list of entries;](https://github.com/anatomiesofintelligence/anatomiesofintelligence.github.io/blob/master/narrative/all-tags.md)

