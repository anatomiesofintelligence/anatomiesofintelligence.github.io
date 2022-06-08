/*
LINK: https://anatomiesofintelligence.xyz
LINK to VOICE narrative:
https://github.com/anatomiesofintelligence/anatomiesofintelligence.github.io/blob/master/narrative/voice-over-reading-AoI.md
ACTIVATE AoI REMOTE: CMD-SHIFT-P
// 2nd table-theatre console window sepparate;
Pre Setup (before audience enters)
* Start SuperCollider / Voice processing setup
* Set up laptops, connect atom to server
*/

/* ---------------------------------------------------------------------------------
  ██████         ██     ██  █████  ██████  ███    ███ ██    ██ ██████
██  ████        ██     ██ ██   ██ ██   ██ ████  ████ ██    ██ ██   ██
██ ██ ██        ██  █  ██ ███████ ██████  ██ ████ ██ ██    ██ ██████
████  ██        ██ ███ ██ ██   ██ ██   ██ ██  ██  ██ ██    ██ ██
██████  ██      ███ ███  ██   ██ ██   ██ ██      ██  ██████  ██
As Audience is Entering
Space black out;
Invite them to lay on/with the inflatables?
* WEB: Soft glowing light
* SC+Jon: drone
--------------------------------------------------------------------- */

/* CUES
SC+Jon: drone fades out
SC+Jon: Voice enters with a strong feeling of space
VOICE+Jo: Welcome to the Anatomies of Intelligence Virtual Theatre
WEB+Jon: Glow increases in speed (see below), becomes more of a pulse > transitioning occassionally into
         a flicker, the speed alternates slow-fast-slow, following the voice
SC+Jon: drone fades back in as a pulse, deeper sounds eventually enter
*/

// Jon: Create Pulsing background 8s loop
document.querySelector(".performance").classList.add('pulse');
document.querySelector(".performance").style.animation= "bgAnim 8s ease-in-out infinite";
//theater.announcementClass = 'announcement-shrink'
theater.announcementClass = 'announcement-scroll'

// Send messages to the chat
theater.addUserMessage("The Anatomist says: Welcome to the Anatomies of Intelligence waiting room", 30000)

// Changing speed of pulsing background
document.querySelector(".performance").style.animationDuration = "3s";
document.querySelector(".performance").style.animationDuration = "0.8s";
document.querySelector(".performance").style.animationDuration = "0.5s";
document.querySelector(".performance").style.animationDuration = "4s";

// WEB+Jon: Set up code announcements to move slowly during the monologue.
theater.codeAnnouncementHeight = 10;
theater.codeAnnouncementLifetime = 20000;
theater.codeAnnouncementAnimDuration = 20000;


// This needs to be done to keep the reverb running when no sound is actively playing.
// WEB + Jo: Run these lines in quick succession, one after another..
dummy = new Tone.Oscillator("D#8", "sine");
dummy.volume.linearRampTo(-36, 1);
dummy.connect(SYNTH.inverb);
dummy.start();
INST.fm.triggerAttackRelease("D#6", 0.01);
// WEB + Jo: Shortly after, run this to silence the dummy oscillator (it will still play silently to keep the reverb alive)
dummy.volume.linearRampTo(-200, 1);




// WEB+Jon: Print these messages while Joana speaks them along with the voice recording...


/*
Welcome to the Anatomies of Intelligence, you will be soon taken on an anatomic journey.
How is your body feeling today? Feel the weight and lightness of your body.
Choose one part of your body, and slowly rotate around the different axis.
Most terms of anatomical location are relative to linear motion, for example translation along the X- Y- and Z-axes,
continue rotating slowly. Take a deep breath. How is your body feeling today?
*/

//- - - >  ECHOE: Welcome to the Anatomies of Intelligence, you will be soon taken on an anatomic journey.

//- - - >  ECHOE:  Take a deep breath. How is your body feeling today?

samples['pre-stage-1'].player.start();
SAMPLE.verb.wet.linearRampTo(0.3, 5); // ramp reverb intensity to 0.3 over 5 seconds
theater.addUserMessage("Anatomist: Welcome to the Anatomies of Intelligence waiting room. You will be soon taken on a an anatomic journey.", 30000)
theater.addUserMessage("Anatomist: How is your body feeling today? ", 30000)


/*
Welcome to the Anatomies of Intelligence, you will be soon taken on an anatomic journey.
Breathe in and out. Breathing is the bridge between the voluntary and involuntary
— the sympathetic and the parasympathetic nervous system; the conscious and the unconscious;
the inner and the outer. Inhale (contract the abdomen) > Retain for 3 to 5sec >
Exhale (expand the abdomen); accelerate Inhale - Exhale;
Breathing deeply helps circulation and oxygenation of the brain.
Airstreams, generative circulation; The brain is irrigated by 2000 liters of blood everyday
and this blood passes through many miles of capillaries.
You are part of a vast circulatory network; which connects organs, functions, enactments.
Who else is breathing in the room?
*/

//- - - >  ECHOE:  Inhale - Exhale.  Who is breathing in the room?

samples['pre-stage-2'].player.start();
theater.addUserMessage("Anatomist: Who else is breathing in the room? Write us a few words to introduce yourself from the viewpoint of one of your organs..", 50000)
//samples['pre-stage-2'].player.stop();

/*
Feel the distance and proximity between you and other bodies in this room.
Proximal in anatomy is the nearest organ to one another. Inter- (from Latin inter, meaning 'between'):
between two other structures, such as the intercostal muscles running between the ribs.
The location of anatomical structures, like a mapping exercise, can be described with relation to different anatomical landmarks.
Here the relationship is based on euclidean distancing: measuring the distance between each entry;
while having no sense of direction nor orientation.
Stretch your body, where does your body end? Where does it begin?
*/

//- - - >  ECHOE:  Stretch your body, where does your body end? Where does it begin?

samples['pre-stage-3'].player.start();
theater.addUserMessage("Anatomist: Stretch your arms, did you touch someone? This is a tight room, write us if you feel soreness or pain in your body, we will avoid close contact.", 30000)

// Finally, when we are ready to start, play the final dialogue

/*
We are now ready to enter the main stage, the anatomic theatre.
A few important rules to follow: be mindful of other bodies in the room,
move quietly and slowly to avoid echoing. Remember to continue breathing.
*/

//- - - >  ECHOE:  be mindful of other bodies in the room, move quietly and slowly to avoid echoing. Remember to continue breathing.

samples['pre-stage-4'].player.start();

// WEB + Jon: Run these lines when the above text is spoken.

theater.addUserMessage("The Anatomist says: Welcome to the Anatomies of Intelligence", 3000);
theater.codeAnnouncementLifetime = 10000;
theater.codeAnnouncementAnimDuration = 10000;
theater.addUserMessage("Anatomist: We are now ready to experience our virtual anatomic theatre.", 5000)
theater.codeAnnouncementLifetime = 35000;
theater.codeAnnouncementAnimDuration = 35000;
theater.addUserMessage("Anatomist: A few important rules to follow: be mindful of other bodies in the room. You can choose to stand or lay down, if you move do it quietly and slowly to avoid echoing. And remember to continue breathing.", 30000)

// WEB + Jon: Once the monologue ends, set code messages to shrink quickly at the top of the screen
theater.codeAnnouncementHeight = 5;
theater.codeAnnouncementLifetime = 3000;
theater.codeAnnouncementAnimDuration = 3000;
theater.announcementClass = 'announcement-shrink';
document.querySelector(".performance").style.animationDuration = "10s";


// WEB + JO: Joana has returned to her seat, Initialize the theatre
document.querySelector(".performance").style.animation = "None";
document.querySelector(".performance").classList.remove("pulse");
initScene(); // initialize the scene (this will fade out the waiting room & enter the theatre layout)

// Limit mouselook to a small region of space looking at the theatre
theater.mouseMove = (xpos, ypos, xmv, ymv)=>{
    camera.quaternion.x = ypos / 20;
    camera.quaternion.y = xpos / 20;
    camera.position.x += xmv / 1000;
    camera.position.y += ymv / 1000;
    UI.followGazeEntries(xpos,ypos,xmv,ymv);
};

// WEB + Jo: (maybe) Mouse hovering around, exploring data points as they fade in and out;

/*----------------------------------------------------------------
 ██        ███████ ███████  █████  ████████ ██    ██ ██████  ███████ ███████
███        ██      ██      ██   ██    ██    ██    ██ ██   ██ ██      ██
██        █████   █████   ███████    ██    ██    ██ ██████  █████   ███████
██        ██      ██      ██   ██    ██    ██    ██ ██   ██ ██           ██
██ ██     ██      ███████ ██   ██    ██     ██████  ██   ██ ███████ ███████
------------------------------------------------------------------*/

/* Overview
SC+Jon: Soundscape with some sense of space that matches the spatialization of the scene
      Could be a continuation of breath, or sounds with some low frequencies
      Some articulation as the features are printed...
WEB+Jo: Slowly building the scene, piece by piece, and moving through it...
WEB+Jon: Slowly hovering over entries while the scene is constructed.
*/

// WEB + JO: Building the scene, one piece at a time when appropriate..
MOVE(view.position).to({x:0, y:30, z:160}, 5000, EASE.sineInOut);
MOVE(floor.scale).to({y:1.0, x: 1.0, z: 1.0}, 10000, EASE.sineInOut);

MOVE(floor.position).to({x: 0, y: 0, z: 0}, 2000, EASE.sineInOut);

MOVE(lamp.position).to({x: 0, y: 40, z: 40}, 3000);
MOVE(lamp).to({intensity: 0.3}, 3000);

MOVE(view.position).to({x:0, y:5, z:20}, 3000, EASE.sineInOut);

MOVE(platform.position).to({x:0, y: -1, z: 0}, 2000);
MOVE(platform.rotation).to({x: -2, y: 0, z: 0}, 5000, EASE.sineInOut);

MOVE(platform.position).to({x:0, y: 2, z: 0}, 5000);
MOVE(platform.rotation).to({x: Math.PI / 2 * 11, y: 0, z: 0}, 10000, EASE.sineInOut);

// Move the platform under the floor
MOVE(platform.position).to({y: -5, z: 0}, 6000, EASE.sineInOut);
MOVE(view.position).to({x:0, y:10, z:160}, 3000, EASE.sineInOut);
MOVE(floor.rotation).to({x: Math.PI / -2 * 8, y: 0, z: 0}, 5000, EASE.sineInOut);

MOVE(platform.position).to({x:0, y:-20, z:20}, 3000, EASE.sineInOut);
MOVE(platform.rotation).to({x: Math.PI / 2* 3, y: 0, z: 0}, 4000, EASE.sineInOut);

MOVE(platform.scale).to({x: 5, y: 5, z: 1}, 4000, EASE.sineInOut);

MOVE(floor.material.specular).to({r: 1, g: 0, b: 0}, 3000, EASE.elasticInOut);
MOVE(floor.position).to({x: 0, y: -30, z: 40}, 1000, EASE.elasticInOut);
MOVE(lamp).to({intensity: 3.0}, 1000);
MOVE(lamp.position).to({x: 0, y: -10, z: -60}, 10000, EASE.elasticInOut);



// WEB + Jo: Continue building the scene, run these one at a time...
camera.myval = camera.getFocalLength();
MOVE(camera, { override: true, onChange: (e) => { camera.setFocalLength( camera.myval ) }} ).to({myval: 10}, 10000, EASE.sineInOut);
MOVE(grid.scale).to({x: 100, y:100, z: 10}, 1000, EASE.sineInOut);
grid.visible = true;
MOVE(grid.scale).to({x: 1, y:20, z: 10}, 10000, EASE.sineInOut);
// ...wait 10 seconds...
MOVE(grid.scale).to({x: 10, y:5, z: 20}, 45000, EASE.sineInOut);

// WEB+Jon: Change code animation to scroll instead of shrink
theater.announcementClass = 'announcement-scroll'

// WEB+Jon: Use a setInterval to list all feature names one after another
//         with a delay of 1.2s
window.featureNameCnt = 0;
window.featureNameTask = setInterval(()=>{
  theater.log(catalog.allFeatureNames[window.featureNameCnt])
  window.featureNameCnt++;
  if(window.featureNameCnt >= catalog.allFeatureNames.length) {
    clearInterval(window.featureNameTask);
  }
}, 1200);

// SC+Jon: drones fade out to silence...

// VOICE+Jo: The Anatomist begins reading the feature names

// WEB+Jo: Start the dialogue of reading the features...
samples['phase01-1'].player.start();

// WEB+Jo: then this one...
samples['phase01-2'].player.start();

// SC+Jon: Voice processing while Joana reads feature names.. building a texture

// WEB+Jon: At an opportune moment, when it becomes repetetive
//          while the features are being read
//          the entries fade in, becoming visible.
//          (opacity should already have a transition value)
entry_divs.forEach((div)=>{ div.style.opacity = 1.0 })

// WEB+Jon: While it is still printing the feature names, move the log div
//          to the left
document.querySelector('#log_output_container').style.transition = "left 5s";
document.querySelector('#log_output_container').style.left = "10vw";
document.querySelector('#log_output_container').style.width = "80vw";


/*----------------------------------------------------------------
 ██████          ██████ ██      ██    ██ ███████ ████████ ███████ ██████  ██ ███    ██  ██████
     ██        ██      ██      ██    ██ ██         ██    ██      ██   ██ ██ ████   ██ ██
 █████         ██      ██      ██    ██ ███████    ██    █████   ██████  ██ ██ ██  ██ ██   ███
██             ██      ██      ██    ██      ██    ██    ██      ██   ██ ██ ██  ██ ██ ██    ██
███████ ██      ██████ ███████  ██████  ███████    ██    ███████ ██   ██ ██ ██   ████  ██████
An instantaneous clustering, identifying outliers.
------------------------------------------------------------------*/


// SC + Jon: Voice manipulations and any other SC audio fades to silence.


// VOICE + Jo: The anatomist performs the text from phase2.1
/*
2.01
• Starting with a simple gesture: cutting. To cut open, to examine, in order to
describe each organ and identify their functions, and discover its relations
to the whole — from organ to organisation, organicity. These are the begginings
of exploring a vast circulatory network circumventing anatomical locations which
connects functions and enactments. Some call it an empirical system to perform
a systematic dissection of the human body.
*/

//- - - >  ECHOE:  Starting with a simple gesture: cutting. To cut open, to examine,..
//- - - > ... a systematic dissection of the human body.

samples['phase02-1'].player.start()


// WEB + Jo: Run an instantaneous clustering after reading paragraph 1
//         in four dimensions, with 8 clusters and 20 iterations

// WEB + Jo: Run these lines in quick succession, one after another..
dummy = new Tone.Oscillator("D#8", "sine");
dummy.volume.linearRampTo(-36, 1);
dummy.connect(SYNTH.inverb);

// WEB + Jo: Start the oscillator..
dummy.start();

// WEB + Jo: Run these two lines as one command
theater.cluster(8, ['body', 'perfection', 'gesture' ,'cut'], 20, true);
INST.fm.triggerAttackRelease("D#6", 0.01);

// WEB + Jo: Shortly after, run this to silence the dummy oscillator (it will still play silently to keep the reverb alive)
dummy.volume.linearRampTo(-200, 1);

// WEB + Jo: hover in theatre while reading the entry titles (or possibly jumping ahead to 2.2)

// WEB + Jon: Follow steps below while Joana is reading...
//            move the room & viewer into a configuration that will
//            make more visible the center and outliers of the 2D projection...
room.material.blending = THREE.NormalBlending;
MOVE( view.position ).to({x:0, y:0, z:60}, 2000);
view.lookAt( new THREE.Vector3(0,0,0) );
MOVE(sun).to({intensity: 1.0}, 5000, EASE.elasticInOut)
MOVE(platform.position).to({x:0, y:0, z:0}, 3000);
MOVE(sun.color).to({r: 1, g: 1, b: 1}, 5000, EASE.elasticInOut)
MOVE(floor.scale).to({x: 0.01, z:1}, 1000);
MOVE(floor.position).to({x: 0, y: 0, z: 0}, 1000);
MOVE(room.scale).to({x:1,y:1.5,z:1}, 3000);
MOVE(room.scale).to({x:1,y:1.8,z:1}, 3000);
MOVE(room.rotation).to({x: 0, y: 0, z: 0}, 1000);
MOVE(room.position).to({x: 0, y: 0, z: 20}, 1000);
MOVE(room.scale).to({x: 5, y: 5, z: 2}, 10000, EASE.sineInOut);

// WEB + Jo: Once the dialogue is finished, project the clustering in 2D
//            along the axes of 'gesture' and 'perfection'
// run these two lines as one command
theater.project(Projections.SIMPLE2D, {scaleDistance: 5, prioritizeFeatures: ['gesture', 'perfection']});
INST.fm.triggerAttackRelease("D#6", 0.01);


// VOICE + Jo: The anatomist reads the text from phase 2.2 - 2.3
/*
2.02
• Learning the best techniques to dissect the body, to effectively observe each
muscle and how the body is laid out. Learning from each cut, hands-on, a humid
sensation activates the smells in the room.
*/

//- - - >  ECHOE:  Learning the best techniques to dissect the body,..

samples['phase02-2'].player.start()


/*
2.03
• Aesthesis or “the faculty or power of sensation” was often used to describe
scientific practices in eighteenth-century European medical and philosophical
dictionaries. "Laying bare and learning about the inner structures of the human
body, was best done through the use of one’s own hands and eyes. (...) However,
although the hand and the eye were indeed considered to be the anatomists’ most
important instruments, all senses, including smell, taste, and hearing were
involved in the practice of anatomy." 
*/

//- - - >  ECHOE: ...“the faculty or power of sensation”

samples['phase02-3'].player.start()



// WEB + Jon: Following the voice, highlight the outliers of the clustering one by one...
//          hover on top of highlighted entries to emphasize them at the right time
//          wait until the voice stops before continuing..
// WEB + Jon: Briefly open the pop-ups through the monologue

document.querySelector("#encephalitis-specilegium-anatomicum").style.transition = "transform 1s, box-shadow 2s";
document.querySelector("#encephalitis-specilegium-anatomicum").classList.add('highlight');
document.querySelector("#encephalitis-specilegium-anatomicum").style.transform= "scale(6)";

document.querySelector("#monsters-unknown-categories-devils-work").style.transition = "transform 1s, box-shadow 2s";
document.querySelector("#monsters-unknown-categories-devils-work").classList.add('highlight');
document.querySelector("#monsters-unknown-categories-devils-work").style.transform= "scale(6)";

document.querySelector("#preserving-monstrocities").style.transition = "transform 1s, box-shadow 2s";
document.querySelector("#preserving-monstrocities").classList.add('highlight');
document.querySelector("#preserving-monstrocities").style.transform= "scale(6)";

document.querySelector("#collections-of-perfection").style.transition = "transform 1s, box-shadow 2s";
document.querySelector("#collections-of-perfection").classList.add('highlight');
document.querySelector("#collections-of-perfection").style.transform= "scale(6)";

document.querySelector("#monster_instruments").style.transition = "transform 1s, box-shadow 2s";
document.querySelector("#monster_instruments").classList.add('highlight');
document.querySelector("#monster_instruments").style.transform= "scale(6)";

document.querySelector("#leiden-preparations").style.transition = "transform 1s, box-shadow 2s";
document.querySelector("#leiden-preparations").classList.add('highlight');
document.querySelector("#leiden-preparations").style.transform= "scale(6)";


/*-----------------------------------------------------------------------------
██████          ██████ ██      ██    ██ ███████ ████████ ███████ ██████  ██ ███    ██  ██████      ██████
     ██        ██      ██      ██    ██ ██         ██    ██      ██   ██ ██ ████   ██ ██                ██
 █████         ██      ██      ██    ██ ███████    ██    █████   ██████  ██ ██ ██  ██ ██   ███      █████
     ██        ██      ██      ██    ██      ██    ██    ██      ██   ██ ██ ██  ██ ██ ██    ██     ██
██████  ██      ██████ ███████  ██████  ███████    ██    ███████ ██   ██ ██ ██   ████  ██████      ███████
A real-time clustering. Rescaled to human relationality.
-------------------------------------------------------------------------------*/

// WEB + Jo: Slow down the code announcements so they are more legible.
theater.codeAnnouncementHeight = 10;
theater.codeAnnouncementLifetime = 8000;
theater.codeAnnouncementAnimDuration = 10000;

// WEB + Jo: Sweep the surface clean, removing all clusters and centroids from
//         the previous clustering. Randomize the entry positions.
//         And clear the log.
//         Do this all at once, also change the code announcement speed
//         before randomizing the entries' positions, so that the sweepSurface()
//         and randomize() commands fall at different speeds.
theater.sweepSurface();
theater.codeAnnouncementAnimDuration = 8000;
theater.randomize();
document.querySelector('#log_output_messages').innerHTML = "";


// WEB + Jon: Enable mouselook
theater.mouseMove = {};
theater.mouseMove = UI.followGazeFixedPosition;

// WEB + Jon: move the room & viewer to hilight the center/outliers of the projection...
MOVE( view.position ).to({x:0, y:0, z:60}, 2000);
view.lookAt( new THREE.Vector3(0,0,0) )
MOVE(room.scale).to({x:0.001,y:1.5,z:1}, 10000, EASE.sineInOut);
room.material.blending = THREE.AdditiveBlending;
MOVE(scene.background).to({r:0.8,g:0.8,b:1}, 2000);
MOVE(room.scale).to({x:0.1,y:1.5,z:1}, 5000, EASE.sineInOut);


// VOICE + Jo: The anatomist reads the text from phase 3
/*
Phase3: In the past demonstrations were usually spread over several days, and
limited to the winter months, in an unheated room facing northward to keep
the sun out. These measures are no longer necessary. In the air there no longer
lingers a smell of incense. There is no, far stronger, smell of rot. Although
we still attempt to start with the most perishable parts of the corpus. There
is still something unnerving, and unpleasant.
*/

//- - - >  ECHOE: .. There is still something unnerving, and unpleasant.

samples['phase03'].player.start()


// WEB + Jon: Perform these changes to the environment at the appropriate time
//            aligned with the voice.
MOVE( view.position ).to({x:0, y:10, z:100}, 2000, EASE.sineInOut);
MOVE(sun).to({intensity: 0.3}, 5000, EASE.sineInOut)
MOVE(sun.color).to({r: 0.2, g: 1, b: 1}, 5000, EASE.elasticInOut)
MOVE(platform.position).to({x:0, y:-20, z:0}, 3000);
MOVE(lamp.color).to({r: 0.8, g: 0.8, b: 0.8}, 5000, EASE.elasticInOut);
MOVE(lamp.position).to({x:0, y:-20, z:-40}, 5000, EASE.elasticInOut);
MOVE(floor.scale).to({x: 1, z:1}, 1000);
MOVE(floor.position).to({x: 0, y: -30, z: 0}, 1000);
floor.material.shininess = 50;
MOVE(floor.material.specular).to({r:1, g:1, b:1}, 2000, EASE.sineInOut);
MOVE(floor.quaternion).to({x: -0.70, y: 0.0, z: 0}, 1000); // square background
MOVE(scene.background).to({r:0.0,g:0.00,b:0.0}, 2000);

// WEB + Jon: Start the clustering when appropriate (after reading has finished)
tempo(80);
theater.cluster(8, ['body', 'perfection', 'gesture' ,'cut'], 3, false);

// WEB + Jon: Animate the camera through the space slowly
// TODO: This can certainly be developed further!
MOVE(view.position).to({x: 0, y: 0, z:-1000}, 30000);
MOVE(view.position).to({x: 0, y: 0, z:400}, 60000);
// TODO: play with cage scaling

// WEB + Jon: Variations on tempo. Do one wave of >> accelerate >> decellerate ...
tempo(300);
tempo(260);
tempo(500);
tempo(600);


// WEB + Jon: Evolution of Beats...
SYNTH.verb.wet.linearRampTo(0.5, 5);
SYNTH.verb.decay = 10;
SYNTH.filter.frequency.linearRampTo(18400, 10);
SYNTH.filter.Q.linearRampTo(5.1, 3); // tight Q
SYNTH.filter.frequency.linearRampTo(2000, 3);


SYNTH.filter.frequency.linearRampTo(500, 3);
SYNTH.filter.Q.linearRampTo(0.1, 3); // wide Q
SYNTH.verb.decay = 30;

SYNTH.verb.wet.linearRampTo(1.0, 5);


// WEB + Jon: Continued slow animations of the space
MOVE(view.position).to({x: 0, y: 3, z:100}, 20000);

// WEB + Jon: More tempo accelerations
tempo(600);
tempo(500);
tempo(400);
tempo(300);
tempo(200);
tempo(100);
// stop()

// WEB: Continued animations of the space
// TODO: Improve and vary these, create continuous looping animations...
MOVE(view.position).to({x: 0, y: 0, z:-1000}, 10000);
MOVE(view.position).to({x: 0, y: 0, z:400}, 60000);


// WEB + Jo: Manipulate font size and other styles?
document.querySelector("#log_output_container").style.fontSize="1rem"; //max 7
// TODO: Maybe end with a somewhat larger font size so that steps are visible..



/*-----------------------------------------------------------------------------
██   ██         ██████  ██    ██ ████████ ██      ██ ███████ ██████  ███████
██   ██        ██    ██ ██    ██    ██    ██      ██ ██      ██   ██ ██
███████        ██    ██ ██    ██    ██    ██      ██ █████   ██████  ███████
     ██        ██    ██ ██    ██    ██    ██      ██ ██      ██   ██      ██
     ██ ██      ██████   ██████     ██    ███████ ██ ███████ ██   ██ ███████
Pop-ups in action; focus on the ex-negativo; the outlier; the monster;
-------------------------------------------------------------------------------*/

// WEB + Jon: First, slow down the clustering & muffle it...
tempo(80);
tempo(70);

// WEB + Jon: muffle sounds of the clustering...
// sounds of disgust... (live coded by Jon)
// Filter all...
SYNTH.filter.Q.linearRampTo(1.0, 3); // tight Q
SYNTH.filter.frequency.linearRampTo(8400, 20);
SYNTH.verb.wet.linearRampTo(0.4, 10);
INST.kik.disconnect();
INST.kik.connect( SYNTH.inverb );

tempo(69);
tempo(58);
tempo(40);
tempo(30);
tempo(20);
tempo(15);
tempo(10);


// VOICE + JO: The anatomist performs text from phase 04.01
/*
PHASE 04
4.01
• Dealing with the disgusting insides of the body and with severed body parts is, of course, inevitable for anatomists.
Paradoxically, is is also a manner in which to gain access to knowledge about the beauty and perfection of a data corpus.
Can you imagine, that under all the bloody bias there is indeed something of profound beauty?
*/

//- - - >  ECHOE: .. Can you imagine, that under all the bloody bias there is indeed something of profound beauty?


// Open individual popups (the monsters & outliers...)
samples['phase04-1'].player.start()



// WEB + Jon: Disable mouselook to be able to move popups off the screen without affecting the screen.
theater.mouseMove = {};

// WEB + Jon: Background dissappears as she speaks....
MOVE(grid.scale).to({x:8, y:20, z:2}, 5000, EASE.sineInOut);
MOVE(scene.background).to({r:0,g:0,b:0}, 2000);
MOVE(view.position).to({x:0, y:0, z: 300}, 2000);
MOVE(view.position).to({x:0, y:0, z: 500}, 100000);
entry_divs.forEach((div)=>{ div.style.opacity = 0.0 });

// WEB + Jon: Enter sounds of Disgust...
// TODO: Following the dismantling of the space by clipping planes
samples['crunch-1'].player.playbackRate = 0.11;
samples['crunch-1'].player.reverse = false;
samples['crunch-1'].player.loop = true;

samples['crunch-1'].player.start();
samples['crunch-1'].player.volume.linearRampTo(-10, 3);
SAMPLE.verb.wet.linearRampTo(0.2, 1);
SAMPLE.verb.decay = 10;
SAMPLE.instereo.high.linearRampTo(0, 2);
SAMPLE.instereo.mid.linearRampTo(0, 2);
SAMPLE.instereo.low.linearRampTo(-8, 2);

samples['crunch-1'].panner.pan.linearRampTo(-0.8, 10);


// WEB + JO: open individual popups (the monsters & outliers...)
//           (run one at a time - Jon moves the popup away from his screen, Joana moves it on to the table)
theater.open('aesthesis-negativo');
theater.open('encephalitis-specilegium-anatomicum');
theater.open('monster_instruments');
theater.open('collections-of-perfection');

// WEB + JO: Functions on table-theatre:
//   morphing ()

// WEB+JO: Enable floating on popups...
theater.popups["aesthesis-negativo"].document.querySelector('html').classList.toggle('float')
theater.popups["encephalitis-specilegium-anatomicum"].document.querySelector('html').classList.toggle('float')
theater.popups["monster_instruments"].document.querySelector('html').classList.toggle('float')
theater.popups["collections-of-perfection"].document.querySelector('html').classList.toggle('float')


// JO stands up and walks around the table;
// VOICE + JO: Announcement phase 04-2

/*
4.02
• The majority of anatomical preparations in the collections of the 18th-century
Leiden anatomists appear to be predominantly examples of normal - or even perfect -
human anatomy, prepared in such a way that they convey the aesthesis of anatomy.
This aesthesis is the result of particular yet tacit ideas of beauty, perfection and elegance.
Most of the body parts were chosen for these preparations because they were already in themselves perfect specimens:
there are no obvious pathologies, and most of them were (part of) young, lean, healthy bodies.
Yet ultimately, they remain severed body parts on the brink of decay - the ultimate emblem of disgust.
*/

//- - - >  ECHOE: ..  ideas of beauty, perfection and elegance

// Voice announcement...
samples['phase04-2'].player.start()



// Voice + JO: reads entry titles

// WEB + Jon: Slow down the tempo just a little bit, start to introduce the other
//            sounds of viscera
tempo(8);


// SC + Jon: modifies voice, distortions


samples['crunch-2'].player.playbackRate = 0.51;
samples['crunch-2'].player.reverse = false;
samples['crunch-2'].player.loop = true;

samples['crunch-2'].player.start();
samples['crunch-2'].player.volume.linearRampTo(-8, 3);
samples['crunch-2'].panner.pan.linearRampTo(0.5, 10);

samples['crunch-3'].player.playbackRate = 0.56;
samples['crunch-3'].player.reverse = false;
samples['crunch-3'].player.loop = true;
samples['crunch-3'].player.start();
samples['crunch-3'].player.volume.linearRampTo(-4, 3);
samples['crunch-3'].panner.pan.linearRampTo(0.4, 10);

MOVE(view.position).to({x:0, y:0, z: -200}, 100000);


// Joana returns to the table ...

// WEB + JO: Manipulations of style matrices on popups
theater.popups["encephalitis-specilegium-anatomicum"].document.querySelector('img').style.transform="matrix(0.1,12,3,14,0.1,6)";
theater.popups["monster_instruments"].document.querySelector('img').style.transform="matrix(1,12,3,4,1,1)";

// VOICE + JO: read phase04-03

/*
4.03
• As this early Enlightenment-era anatomy developed, the study of pathology
and abnormalities became increasingly important, and a new aesthesis of monstrosities emerged.
An aesthesis of the ugly and the imperfect. An aesthesis ex negativo.
*/

//- - - >  ECHOE: .. and a new aesthesis of monstrosities emerged.

samples['phase04-3'].player.start()

// WEB + JO: Random movement of popups...
for(pid in theater.popups) {
  theater.popups[pid].moveTo(Math.floor(Math.random() * 1700), Math.floor(Math.random() * 900));
}

// WEB + Jo: close all open popups
for(id in theater.popups) { theater.popups[id].close() };


/*-----------------------------------------------------------------------------
____   _   _          _____ _   _ ____
███████        ███████ ███    ██ ██████
██             ██      ████   ██ ██   ██
███████        █████   ██ ██  ██ ██   ██
     ██        ██      ██  ██ ██ ██   ██
███████ ██     ███████ ██   ████ ██████
Rounding up the end....
-------------------------------------------------------------------------------*/

// WEB + Jon: Accellerate the clustering back up to rhythmic speeds...
tempo(20);
tempo(100);

// WEB + Jon: Fade out the visceral sounds...
samples['crunch-1'].player.volume.linearRampTo(-60, 3);
samples['crunch-2'].player.volume.linearRampTo(-60, 3);
samples['crunch-3'].player.volume.linearRampTo(-60, 3);

// WEB + Jon: At the end of the fadeout, silence all sample players
Object.entries(samples).forEach((smpl)=>{smpl[1].player.stop()});

// WEB + Jon: Continue to accellerate
tempo(50);
tempo(60);
tempo(70);
tempo(80);
tempo(120);
tempo(500);
tempo(700);
tempo(800);
// 900 is the maximum value, over the limit of what Jon's laptop can handle!
tempo(900);


// TODO: Manipulations of audio callbacks during clustering...

// A bit of audio mindfuck during the clustering.... reading features...
// Start the dialogue of reading the features...
samples['phase01-1'].player.start()
// then this one...
samples['phase01-2'].player.start()
samples['phase01-2'].player.playbackRate = 0.7;
SAMPLE.verb.wet.linearRampTo(0.2, 4);
SAMPLE.inmonovoice.mid.linearRampTo(-12, 3);
SAMPLE.del = new Tone.PingPongDelay({delayTime:"4n", feedback:0.2, channelCount: 1}).connect(SAMPLE.verb);
samples['phase01-2'].player.connect(SAMPLE.del);
samples['phase01-2'].player.disconnect(SAMPLE.inmonovoice);
SAMPLE.del.feedback.linearRampTo(0.1, 3);
SAMPLE.del.delayTime.linearRampTo(0.3, 0.2);
samples['phase01-2'].player.disconnect();
samples['phase01-2'].player.connect(SAMPLE.inmonovoice);




// VOICE + JO: The anatomist performs the text from phase 4.04
/*
4.04
• Pathological specimens like these appear often and are of great interest. They are the statistical outliers that in some cases break the model's delicate facia. But in most cases, they force a rethinking of the model's effectivity and are subsumed by it, reinforcing the model's power as a knowledge. By preserving monstrocities in preparations, the immediate danger implied by the visceral disgust such specimines provoke is averted. Instead, we shape them into didactic instruments and purveyors of meaning. 
• All deceiving measurements, the distance between the perfect and the imperfect, from worship to disgust and reverse. Far away coming closer, cutting through perceptual fields, blending in. We initiate a new path, we follow the shadow, the unwanted and the most wanted, the outlier, the monster, and the sublime.
*/

// CHECK this is working !

samples['phase04-4'].player.start()


// WEB + Jon: Fade the entries into view.
entry_divs.forEach((div)=>{ div.style.opacity = 1 })

// WEB + Jon: Animate the space so as to accompany the voice.
view.lookAt(new THREE.Vector3(0,0,0));
MOVE( view.position ).to({x:0, y:20, z:200}, 5000);
MOVE(room.scale).to({x: 1, y: 1, z:1}, 1000);
MOVE(sun).to({intensity: 10}, 5000, EASE.sineInOut);
MOVE(sun.color).to({r: 1, g: 1, b: 1}, 5000, EASE.elasticInOut);
room.material.blending = THREE.SubtractiveBlending;
MOVE(lamp.color).to({r: 1.0, g: 0.1, b: 0.8}, 5000, EASE.elasticInOut);
MOVE(scene.background).to({r:0.10,g:0.01,b:0.222}, 2000);
MOVE(grid.scale).to({x:1.0,y:10,z:0.1}, 2000);
MOVE(grid.quaternion).to({x:0,y:0,z:0}, 2000);

// WEB + Jon: (Maybe) allow mouse movement
theater.mouseMove = UI.followGazeFixedPosition;


// Final voicing...

// VOICE + JO: read phase 05
/*
PHASE 05
• The anatomist and the anatomized body. Iteration over iteration, calculating
distances cutting across various lengths. Performing a series of dissections,
cutting through corpses, data, our anatomic dataset collection.
Classified objects of knowledge, a new collection is born.
*/

//- - - >  ECHOE: a new collection is born.

samples['phase05'].player.start()
entries_container.style.transition = "transform 3s";
entries_container.style.transform = "scale(0.4, 0.4)";
entries_container.style.transform = "scale(1, 1)";


// WEB + JO: Bring the log back to visibility, increase/play with the font size
//         of log messages output by the clustering algorithm.
document.querySelector("#log_output_container").style.overflow = "visible";
document.querySelector("#log_output_container").style.fontSize="1rem"


// WEB + JON: More animations...
MOVE(grid.quaternion, {loop: true}).to({x:Math.PI}, 2000);
MOVE(grid.scale, {loop: true}).to({x:0.1,y:10,z:1}, 10000);

MOVE(scene.background).to({r:0.0,g:0.0,b:0}, 10000);
MOVE( view.position ).to({x:0, y:50, z:300}, 15000);
MOVE(scene.background).to({r:0.2,g:0.2,b:0.3}, 10000);


MOVE( view.position ).to({x:0, y:10, z:100}, 10000, EASE.sineInOut);
MOVE(grid.quaternion, {loop: true}).to({y:Math.PI}, 2000);



// CLUSTERING DONE

// WEB + Jon: STOP ANIMATIONS one by one, ONCE THE CLUSTERING IS FINISHED
MOVE(grid.quaternion, {override: true}).to({y:0.5, x:2.2}, 5000, EASE.sineInOut);
MOVE(grid.scale, {override: true}).to({x:1,y:1,z:1}, 4000, EASE.sineInOut);


// WEB + JO: Set up entries for animated projections
entries_container.style.transition = "transform 3s";

// WEB + JO: Presenting: Zoom the scale of the clustering to different sizes
entries_container.style.transform = "scale(1, 1)";

// WEB + JO: Prepare entries for RADIUS projection animations
entry_divs.forEach((div)=>{ div.style.transition = "top 3s, left 2s, opacity 3s" });

// WEB + JO: Animate radius projection, animate it at different widths (making them breathe)
theater.project(Projections.RADIUS, {scale: 5});
theater.project(Projections.RADIUS, {scale: 10});
theater.project(Projections.RADIUS, {scale: 50});

// WEB + Jon: Ending animation > The camera follows a path around the theater
view.position.followPath = new THREE.CatmullRomCurve3( [
  new THREE.Vector3(-70, 10, 70),
  new THREE.Vector3( 0, 10, 70 ),
  new THREE.Vector3( 70, 10, 70 ),
  new THREE.Vector3( 70, 10, -70 ),
  new THREE.Vector3( 0, 10, -70 ),
  new THREE.Vector3( -70, 10, 70 ),
] );
view.position.idx = 0.0;
view.position.focusPoint = new THREE.Vector3(0,0,0);
theater.mouseMove = ()=>{};
MOVE(view.position, {override: true, loop: true, onChange: (ev)=>{
  let t = ev.target.target;
  let p = t.followPath.getPoint(t.idx);
  view.position.x = p.x;
  view.position.y = p.y;
  view.position.z = p.z;
  view.lookAt( t.focusPoint );
}}).to({idx: 1.0}, 20000, EASE.sineInOut)



// ENDING


// WEB + Jo: Fade out the log text
document.querySelector('#log_output_container').style.transition = "opacity 3s";
document.querySelector('#log_output_container').style.opacity = 0;

// WEB + Jo: change circle table to black;

// WEB + Jo: entries fade out
entry_divs.forEach((div)=>{ div.style.opacity = 0 });


// WEB + Jon: STOP ANIMATION
MOVE(view.position, {override: true, loop: false, onChange: (ev)=>{
  let t = ev.target.target;
  let p = t.followPath.getPoint(t.idx);
  view.position.x = p.x;
  view.position.y = p.y;
  view.position.z = p.z;
  view.lookAt( t.focusPoint );
}}).to({idx: 1.0}, 10000, EASE.sineOut);



// WEB + Jon: Transform the scene for the final visual...
// TODO: Slow ending animation to a fixed "test pattern" with blue solid and blurred line
scene.remove(window.curveObj);
MOVE( sun.color ).to({r: 0.0, g: 0.0, b: 1.0}, 1000);
MOVE( sun ).to({intensity: 10}, 1000);
MOVE( grid.scale ).to({x: 300, y: 300, z: 300}, 2000);
MOVE( view.position ).to({x:0, y:0, z:0}, 3000);
MOVE( view.quaternion ).to({x:0, y:0, z:0}, 3000);
MOVE( scene.background ).to({r: 0, g: 0, b: 1}, 10000, EASE.sineInOut)
MOVE( floor.scale ).to({x: 5, y: 2, z: 5}, 3000);
MOVE( floor.position ).to({z: -10, y: -50}, 3000);

// SC + Jon: Some return of sound from the beginning.. throbbing drone with echo space..


// Web + Jon re-establish Mouse move?
theater.mouseMove = {};

// Web + Jon ending animations towards black out

MOVE( view.quaternion, {override: true} ).to({x:0.01, y:1.2, z:-1.2, w: 3.1}, 10000, EASE.sineInOut);
MOVE( view.quaternion, {override: true} ).to({x:2.01, y:-1.2, z:-3.2, w: 3.1}, 10000, EASE.sineInOut);
MOVE( view.quaternion, {override: true} ).to({x:-0.1, y:0.1, z:0.2, w: 36}, 10000, EASE.sineInOut);
MOVE( view.quaternion, {override: true} ).to({x:0, y:10.2, z:105.2, w: 0}, 10000, EASE.sineInOut);

// SC + Jon: sound fades out to silence
// WEB + Jon: theatre goes black except for the cluster centers
//MOVE( view.quaternion, {override: true} ).to({x:0, y:0, z:0, w:1}, 10000, EASE.sineInOut);
MOVE( view.quaternion, {override: true, loop: true, bounce: true, reversed: true} ).to({x:-10.5, y:100.5, z:0.1, w:-200.2}, 1500, EASE.sineInOut);
MOVE( scene.background ).to({r: 0, g: 0, b: 0}, 30000, EASE.sineInOut);


// Voice + JO: Stands up and addresses the audience again to return to their bodies.

/*
END
You may now return to your bodies, continue breathing…
*/


// WRAP UP ON WEBSITE (if necessary) ...
// allow the mouse to move scene
// at some point stop the animation and allow the mouse to control...
theater.mouseMove = UI.followGazeFixedPosition;

// CREATES THE ZOOM LINK DIV (by default has opacity = 0)
window.enddiv = document.createElement('div');
window.enddiv.id = "banner";
window.enddiv.style.padding = "0.5rem";

theater.codeAnnouncementLifetime = 30000;
theater.codeAnnouncementAnimDuration = 30000;

window.enddiv.appendChild(document.createTextNode(" ♥ Thank you for attending the performance  ♡ °  ☽ "));

/*
window.endlink = document.createElement('a');
window.endlink.href = "https://us02web.zoom.us/j/83665664089?pwd=VHZKR3pVY2kvRER5eWdwNzdRYlY0Zz09";
window.endlink.innerText = " ZOOM";
window.endlink.style.textDecoration = "underline";
window.endlink.style.color = "rgb(0, 200, 255)";
window.enddiv.appendChild(window.endlink);
*/

document.body.appendChild(window.enddiv); // add to the dom
window.enddiv.style.opacity = 1.0; // make it visible

// if you want to remove the ending banner
window.enddiv.style.opacity = 0.0;
window.enddiv.remove();
