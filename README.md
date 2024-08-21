[Hosted on github pages](https://rajjayavant.github.io/MetronomeLogger)

# Project Purpose & Overview

What is a metronome? 
Well, in simple terms, a metronome is a clock. It keeps time. Then what's wrong with the clock i wear on my wrist. It keeps time, but not for musicians. Every musician, especially instrumentalists NEED a metronome in their life. A metronome clicks at a particular BPM or beats per minute, which can help a musician practice anything they want to practice at a particular speed. Metronomes are used widely and almost all music recorded is recorded with a metronome clicking in the musicians ear. Now that we have established what a metronome is, lets focus on the logging side of it.

Why a logger?
Most instrumentalists have exercises that they practice on their instrument and the methodology to doing that is playing the metronome at a particular BPM, getting comfortable at that speed and they maybe on later days trying to improve on that speed by increasing the BPM. I wanted to keep a track of the BPM I am currently comfortable for each exercise. I had to write it down every time, and so I wondered why not have a mechanism to keep track of my progress in my metronome itself. This is the purpose of this project - to make my practice sessions smoother.

## Initial Design
![Design](https://github.com/user-attachments/assets/a999b5b4-8cf7-48f7-b62c-15deee9b2f94)


## Technologies Used & Issues Faced

This project uses React.js, for all the frontend. I used the NextUI UI library for some sparkle and for the data side of it - Javascript and React provides you access to the local storage of your browser as a window object accessible as 'localStorage' globally. You can store data (logs in this case) to your local storage and it can be accessed quite easily throughout the application.

The main pain point in this project was definitely the metronome itself. As Javascript is a single threaded programming languages, it faces a hard time keeping rock solid time because of the multiple tasks for a single thread. Hence simple setIntervals could not be used as we wanted accuracy more than anything for each click. And hence a web worker which preschdules the clicks was to be setup. If you are interested in the mechanism of getting a metronome to be accurate read [this](https://web.dev/articles/audio-scheduling#toc-rocksolid)

Further Backend integration will be done using Node.js & MongoDB.

## Upcoming Features
- Toggle Between Light & Dark Themes
- Updating your logs
- Optional User Auth for data to be linked with an account for cross device intergrity of data


