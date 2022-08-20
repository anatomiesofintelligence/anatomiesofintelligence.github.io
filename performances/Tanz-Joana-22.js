
/* ---------------------------------------------------------------------------------
__          __     _____ _______ _____ _   _  _____   _____   ____   ____  __  __
\ \        / /\   |_   _|__   __|_   _| \ | |/ ____| |  __ \ / __ \ / __ \|  \/  |
 \ \  /\  / /  \    | |    | |    | | |  \| | |  __  | |__) | |  | | |  | | \  / |
  \ \/  \/ / /\ \   | |    | |    | | | . ` | | |_ | |  _  /| |  | | |  | | |\/| |
   \  /\  / ____ \ _| |_   | |   _| |_| |\  | |__| | | | \ \| |__| | |__| | |  | |
    \/  \/_/    \_\_____|  |_|  |_____|_| \_|\_____| |_|  \_\\____/ \____/|_|  |_|

---------------------------------------------------------------------------------- */

// While people are entering... we play the voice tracks... with a 1 minute pause between them
// Also send the text in the chat room:
// https://github.com/anatomiesofintelligence/anatomiesofintelligence.github.io/blob/master/narrative/umanesimo-artificiale.md

// ACTIVATE AoI REMOTE: CMD-SHIFT-P

theatre.announcementClass = 'announcement-shrink'
theatre.codeAnnouncementSize = "1.6rem";
theatre.codeAnnouncementColor = "#A9BCF5";
theatre.codeAnnouncementLifetime = 10000;
theatre.codeAnnouncementAnimDuration = 10000;
theatre.announcementClass = 'announcement-shrink';
theatre.codeAnnouncementHeight = 20;

<<silent>>
theatre.addUserMessage("The Anatomist says: Welcome to the Anatomies of Intelligence waiting room", 30000)

samples['pre-stage-1'].player.start();

<<silent>>
theatre.addUserMessage("The Anatomist says: Welcome to the Anatomies of Intelligence waiting room. You will be soon taken on a an anatomic journey.", 30000)

<<silent>>
theatre.addUserMessage("The Anatomist asks: How is your body feeling today? ", 30000)

samples['pre-stage-2'].player.start();

<<silent>>
theatre.addUserMessage("Anatomist asks: Who else is breathing in the room? Write us a few words to introduce yourself from the viewpoint of one of your organs..", 50000)

samples['pre-stage-3'].player.start();

<<silent>>
theatre.addUserMessage("Anatomists asks: Stretch your arms, did you touch someone? This is a tight room, write us if you feel soreness or pain in your body, we will avoid close contact.", 30000)

// Finally, when we are ready to start, play the final dialogue
samples['pre-stage-4'].player.start();

<<silent>>
theatre.addUserMessage("The Anatomist says: We are now ready to enter the main stage, the anatomic theatre. A few important rules to follow: be mindful of other bodies in the room, move quietly and slowly to avoid echoing. Remember to continue breathing.", 30000)


// Once the audio is over start the theatre...
initScene()

//  01:  The Dataset ~ 7-5min //
// Allow the audience to click & search around for the phantom entries ~ 30s

/*----------------------------------------------------------------
 __      ____  ____    __   ____  __  __  ____  ____  ___
/  )    ( ___)( ___)  /__\ (_  _)(  )(  )(  _ \( ___)/ __)
 )(      )__)  )__)  /(__)\  )(   )(__)(  )   / )__) \__ \
(__)()  (__)  (____)(__)(__)(__) (______)(_)\_)(____)(___/
------------------------------------------------------------------*/

// Limited Look, gaze moves entries and allows looking around in a space limited to the frontal view of the stage
theatre.mouseMove = UI.followGazeLimited;
view.lookAt( new THREE.Vector3(0,5,0) );

theatre.codeAnnouncementHeight = 80;

// JON
// Draw floor ...
// Show the grid...


// change code animation to scroll instead of shrink...
theatre.announcementClass = 'announcement-scroll'


// Start the dialogue of reading the features...
samples['phase01-1'].player.start()
// then this one...
samples['phase01-2'].player.start()

document.querySelector('#log_output_container').style.fontSize = "1rem";


/*
theatre.log(catalog.allFeatureNames);
document.querySelector("#log_output_messages li").style.wordWrap="break-word";
document.querySelector("#log_output_messages li").style.fontSize="0.8rem";
document.querySelector("#log_output_messages li").style.fontSize="1.5rem";
*/


// use a setInterval to list all feature names one after another
window.featureNameCnt = 0;
window.featureNameTask = setInterval(()=>{
  theatre.log(catalog.allFeatureNames[window.featureNameCnt])
  window.featureNameCnt++;
  if(window.featureNameCnt >= catalog.allFeatureNames.length) {
    clearInterval(window.featureNameTask);
  }
}, 1200)

// move the log to the left...
document.querySelector('#log_output_container').style.transition = "left 5s";
document.querySelector('#log_output_container').style.left = "10vw";
document.querySelector('#log_output_container').style.width = "80vw";

// when the grid is built fade in the entries
entry_divs.forEach((div)=>{ div.style.opacity = 1.0 })


/*----------------------------------------------------------------
    _____     _____  _     _   _ _____ _____ ___________ _____ _   _ _____
  / __  \   /  __ \| |   | | | /  ___|_   _|  ___| ___ \_   _| \ | |  __ \
 `' / /'   | /  \/| |   | | | \ `--.  | | | |__ | |_/ / | | |  \| | |  \/
   / /     | |    | |   | | | |`--. \ | | |  __||    /  | | | . ` | | __
 ./ /____  | \__/\| |___| |_| /\__/ / | | | |___| |\ \ _| |_| |\  | |_\ \
\_____(_)  \____/\_____/\___/\____/  \_/ \____/\_| \_|\___/\_| \_/\____/

An instantaneous clustering, identifying outliers.

------------------------------------------------------------------*/

samples['phase02-1'].player.start()

// ADD NEW AUDIO

// ME — instantaneous clustering...
theatre.cluster(8, ['body', 'perfection', 'gesture' ,'cut'], 20, true);

theatre.addUserMessage("Explore the dataset by clicking in the squares.", 30000)

samples['phase02-2'].player.start()

// Jon a 2D projection...
theatre.project(Projections.SIMPLE2D, {scaleDistance: 5, prioritizeFeatures: ['gesture', 'perfection']});

// Audio section 3 of phase 2
samples['phase02-3'].player.start()


// ADD NEW AUDIO


// HIGHLIGHT OUTLIERS
// ONE - BY - ONE
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


document.querySelector("#encephalitis-specilegium-anatomicum").style.transform= "scale(1)";
document.querySelector("#monsters-unknown-categories-devils-work").style.transform= "scale(1)";
document.querySelector("#preserving-monstrocities").style.transform= "scale(1)";
document.querySelector("#collections-of-perfection").style.transform= "scale(1)";
document.querySelector("#monster_instruments").style.transform= "scale(1)";
document.querySelector("#leiden-preparations").style.transform= "scale(1)";


// Wait until audio finishes...

/*-----------------------------------------------------------------------------
  _____      ___   __       __  _____  __  __   _____    __  ___   ____
 |___ /     / __\ / / /\ /\/ _\/__   \/__\/__\  \_   \/\ \ \/ _ \ |___ \
  |_ \    / /   / / / / \ \ \   / /\/_\ / \//   / /\/  \/ / /_\/   __) |
 ___) |  / /___/ /__\ \_/ /\ \ / / //__/ _  \/\/ /_/ /\  / /_\\   / __/
|____(_) \____/\____/\___/\__/ \/  \__/\/ \_/\____/\_\ \/\____/  |_____|

A real-time clustering. Rescaled to human relationality.

-------------------------------------------------------------------------------*/

// ME — erase all clusters & centroids, and clear the log...
entry_divs.forEach((div)=>{ div.style.transition = "top 5s, left 1s, opacity 3s" });
theatre.sweepSurface();
document.querySelector('#log_output_messages').innerHTML = "";
theatre.randomize();
entry_divs.forEach((div)=>{ div.style.transition = "" });


// Restructure the stage....
// User gets full view control back...

// move the room & viewer to hilight the center/outliers of the projection...
theatre.mouseMove = UI.followGazeLimited;

// sound samples ...
samples['phase03'].player.start()

// Jon modifies the theatre

// ADD NEW AUDIO

// ME —start the clustering....
tempo(80)
theatre.cluster(8, ['body', 'perfection', 'gesture' ,'cut'], 3, false);

document.querySelector("#log_output_container").style.fontSize="1rem"; //max 7


// Jon modifies the theatre
// Jon modifies beats...


// ME
// Animated camera movements: TODO: This can certainly be developed further!
MOVE(view.position, {override: true}).to({x: 0, y: 100, z:-1000}, 80000);
MOVE(view.position, {override: true}).to({x: 0, y: -100, z:400}, 80000);
MOVE(view.position, {override: true}).to({x: 0, y: 10, z:100}, 10000);


// Jon one wave of >> accelerate >> decellerate ...
tempo(110)
tempo(500)
tempo(400)
tempo(300)
tempo(200)
tempo(100)
// stop()


/*-----------------------------------------------------------------------------
 _  _                _   _ _
| || | _  ___  _   _| |_| (_) ___ _ __ ___
| || |(_ / _ \| | | | __| | |/ _ | '__/ __|
|__   __| (_) | |_| | |_| | |  __| |  \__ \
  |_|(_ \___/ \__,_|\__|_|_|\___|_|  |___/

Pop-ups in action; focus on the ex-negativo; the outlier; the monster;
-------------------------------------------------------------------------------*/

// Jon slow down the clustering & muffle it...
tempo(10)
// muffle sounds of the clustering...
// background dissappears....

// Jon live codes sounds of disgust...

// Open individual popups (the monsters & outliers...)
samples['phase04-1'].player.start()

// ADD NEW AUDIO

theatre.open('aesthesis-negativo')
theatre.open('encephalitis-specilegium-anatomicum')
theatre.open('monster_instruments')
theatre.open('collections-of-perfection')

// Voice announcement...
samples['phase04-2'].player.start()

// toggle status of float class on a specific window...
theatre.popups["aesthesis-negativo"].document.querySelector('html').classList.toggle('float')
theatre.popups["encephalitis-specilegium-anatomicum"].document.querySelector('html').classList.toggle('float')
theatre.popups["monster_instruments"].document.querySelector('html').classList.toggle('float')
theatre.popups["collections-of-perfection"].document.querySelector('html').classList.toggle('float')


samples['phase04-3'].player.start()


for(pid in theatre.popups) {
  theatre.popups[pid].moveTo(Math.floor(Math.random() * 1700), Math.floor(Math.random() * 900));
}


// Jon speeds up the clustering


// close all open popups
for(id in theatre.popups) { theatre.popups[id].close() }

entry_divs.forEach((div)=>{ div.style.opacity = 1 })


/*-----------------------------------------------------------------------------
____   _   _          _____ _   _ ____
| ___| | |_| |__   ___| ____| \ | |  _ \
|___ \ | __| '_ \ / _ |  _| |  \| | | | |
___) _| |_| | | |  __| |___| |\  | |_| _ _ _
|____(_ \__|_| |_|\___|_____|_| \_|____(_(_(_)

Rounding up the end....
-------------------------------------------------------------------------------*/

// Jon speeds up
tempo(700)
tempo(800)
tempo(900)

// Jon plays again the dialogue of reading the features...
// Jon modifies scene


// END OF CLUSTERING

entries_container.style.transition = "transform 3s";
entries_container.style.transform = "scale(0.4, 0.4)";
entries_container.style.transform = "scale(1, 1)";

document.querySelector("#log_output_container").style.overflow = "visible";
document.querySelector("#log_output_container").style.fontSize="0.2rem"

// ADD NEW AUDIO

entry_divs.forEach((div)=>{ div.style.transition = "top 3s, left 2s, opacity 3s" });

theatre.project(Projections.RADIUS, {scale: 5}); // 20
theatre.project(Projections.RADIUS, {scale: 10});
theatre.project(Projections.RADIUS, {scale: 80});

document.querySelector('#log_output_container').style.transition = "opacity 3s";
document.querySelector('#log_output_container').style.opacity = 0;


"Explore the clustering by clicking in the different entries.""


// Final voicing...
samples['phase05'].player.start()



"How are your bodies feeling today?"
// remember to continue breathing ...


// ENDING....
// entries fade out
entry_divs.forEach((div)=>{ div.style.opacity = 0 })

<<silent>>
window.enddiv = document.createElement('div');
window.enddiv.id = "banner";
window.enddiv.style.padding = "0.5rem";
window.enddiv.style.color = "white";
window.enddiv.style.backgroundColor = "black";
window.enddiv.appendChild(document.createTextNode(" ♥ Thank you for attending the performance  ♡ °  ☽ "));
document.body.appendChild(window.enddiv); // add to the dom
theatre.codeAnnouncementHeight = 20;

<<silent>>
window.enddiv.appendChild(document.createTextNode(" ♥ Thank you for attending the performance  ♡ °  ☽ "));

<<silent>>
window.enddiv.style.opacity = 1.0; // make it visible

<<silent>>
window.enddiv.style.opacity = 0.0;
window.enddiv.remove();
