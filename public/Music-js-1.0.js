class _MJS {

	/**
	 *   |------------------------------------------------------------------|
	 *   | ------------------------- VERSION: 1.0 ------------------------- |
	 *   | -----------Licensed To: SHANU RAJ { New Delhi, INDIA}----------- |
	 *   | --------Developer GitHub: HTTPS://GITHUB.COM/SHANURAJ715-------- |
	 *   | -------GitHub Repository: HTTPS://GITHUB.COM/SHANURAJ715/------- |
	 *   | ------------Developer Email: shanuraj715@gmail.com-------------- |
	 *   |																	|
	 *   | ----This class is free to use and can be modify by anyone.------ |
	 *   | -------You can use this in your projects and products----------- |
	 *   | --- CODE AVAILABILITY: Plain Code, Minified, Encrypted (HEX) --- |
	 *   |------------------------------------------------------------------|
	 */



	// --------------------------------------------------
	// -------------------- SETTINGS --------------------
	// ------------------ PRIVATE VARS ------------------
	// ----- Set can be set by the class constructor ----
	// --------------------------------------------------

	#el = true // error Logging on any error to browser console
	#pc = true // play continuous from queue { true: auto next from queue, false: pause on song complete. (next song by calling: next())}
	#cq = false // custom Queuing {true: filter queue for only src objects, false to disable queue object filtering, (store any property in queue)}
	#kb = true // keyboard keys binding for controlling the audio. 

	// --------------------------------------------------
	// --------------------------------------------------
	// ---------- PRIVATE VARS: DO NOT CHANGE -----------
	// --------------------------------------------------
	// --------------------------------------------------

	#ad = null // stores audio source URL

	#ao = null // the main audio Object. Created by "new Audio"

	#paused = false // is audio is paused

	#playing = false // is playing

	#stopped = false // is stopped

	#muted = false // is the audio is muted

	#repeating = false // is repeating
	#ABinter // stores setInterval to repeat A to B

	#repAB = false // Repeat from A to B position
	#repA // in seconds
	#repB // in seconds

	#pifq = 0 // current playing song index number from the queue
	#queue = [] // the queue which store the list of songs


	#interval // for repeating the song. using to detect if currTime == duration

	constructor(obj) {
		if (typeof obj === 'undefined') return
		if (typeof obj !== "object") {
			console.error("parameter must be a type of \"object\" in \"constructor\"")
			return
		}
		this.#el = obj.errorLog === undefined ? true : obj.errorLog
		this.#pc = obj.continuePlay === undefined ? true : obj.continuePlay
		this.#cq = obj.customOueue === undefined ? true : obj.customOueue
		this.#kb = obj.keyBind === undefined ? false : obj.keyBind

		// keyboard key listning
		if (this.#kb) document.addEventListener('keypress', this.#keyListen)
	}

	// ----------------------------------------------------
	// ----------------------------------------------------
	// ----------------- PRIVATE FUNCTIONS ----------------
	// ----------------------------------------------------
	// ----------------------------------------------------

	// ** DO NOT EDIT THE BELOW CODE **

	#setAudState = audState => {
		switch (audState) {
			case "play":
				this.#playing = true
				this.#paused = false
				this.#stopped = false
				break

			case "pause":
				this.#playing = false
				this.#paused = true
				this.#stopped = false
				break

			case "stop":
				this.#playing = false
				this.#paused = false
				this.#stopped = true
				break
		}
		return true
	}


	// ----------------------------------------------------
	// ----------------------------------------------------
	// --------- PUBLIC FUNCTIONS or PUBLIC API -----------
	// ----------------------------------------------------
	// ----------------------------------------------------


	/**
	 * @param {String} url the audio source URL
	 * @returns nothing if error, else the audio object
	 */
	setAudio = url => {
		if (!url) {
			this.#el ? console.warn("\"setAudio\" method must accept an URL as audio source.") : null
			return false
		}
		this.#ad = url
		try {
			window.AudioContext = window.AudioContext || window.webkitAudioContext
		}
		catch (e) {
			console.error("Web Audio API is not supported by the browser.")
			return false
		}
		this.#ao = new Audio(url)
		this.#ao.onpause = () => {
			if (parseInt(this.#ao.currentTime) === parseInt(this.#ao.duration)) {
				this.#setAudState('stop')
			}
			else {
				this.#setAudState('pause')
			}
		}
		this.#ao.onplay = () => {
			this.#setAudState('play')
		}
		return this.#ao
	}

	play = () => {
		if (this.#ad === null) {
			if ((this.#queue).length !== 0) {
				this.QUEUE.play(0)
				return
			}
			this.#el ? console.warn("Please set the audio source by calling \"setAudio\" method") : null
			return
		}
		if (this.#playing) {
			this.#el ? console.log("Already playing") : null
			return
		}
		this.#ao.play()
		if (this.#pc && this.#queue.length !== 0) {
			this.#interval = setInterval(() => {
				if (parseInt(this.getCurrentTime()) === parseInt(this.getAudioDuration())) {
					!this.#repeating && this.next()
				}
			}, 500)
		}
	}

	pause = () => {
		if (this.#playing) {
			this.#ao.pause()
			return true
		}
		return false
	}

	toggle = () => {
		if (this.#ad === null) {
			this.#el ? console.warn("Please set the audio source by calling \"setAudio\" method") : null
			return
		}
		this.#playing ? this.pause() : this.play()
	}

	stop = () => {
		if (this.#playing || this.#paused) {
			this.#ao.pause()
			this.#ao.currentTime = 0
		}
		clearInterval(this.#interval)
		return true
	}

	prev = () => {
		let queue = this.#queue
		if (queue.length === 0) return
		let prevIndex = this.#pifq - 1

		if (prevIndex >= 0) {
			this.stop()
			this.setAudio(queue[prevIndex].src).play()
			this.#pifq--
		}
	}

	next = () => {
		let queue = this.#queue
		if (queue.length === 0) return
		let nextIndex = this.#pifq + 1
		if (nextIndex < queue.length) {
			this.#pifq = nextIndex
			this.stop()
			this.setAudio(queue[nextIndex].src).play()
		}

	}

	mute = bool => {
		this.#muted = !!bool
		this.#ao.muted = !!bool
	}

	seekTo = sec => {
		if (isNaN(sec)) {
			this.#el ? console.warn("seekTo function must accept a parameter of type integer") : null
			return false
		}

		if (sec > this.#ao.duration) {
			this.#el ? console.warn("Unable to seek the audio because the time is greater than total duration of audio.") : null
			return false
		}
		this.#ao.currentTime = sec
		return true
	}

	setVolume = vol => {
		if (isNaN(vol)) {
			this.#el ? console.warn("Volume limit must be an integer type.") : null
			return false
		}
		vol = vol < 0 ? 0 : vol > 100 ? 100 : vol
		this.#ao.volume = parseInt(vol) / 100
		return true
	}

	speed = val => {
		if (isNaN(val)) {
			this.#el ? console.error("parametr of method \'speed\" must be type of integer") : null
			return
		}

		if (parseInt(val) < 0.1 && parseInt(val) > 5) {
			this.#el ? console.error("Invalid speed range. Range must between 0.1 to 5") : null
			return
		}
		this.#ao.playbackRate = val
		return true
	}

	repeat = bool => {
		if (typeof bool !== "boolean") {
			this.#el ? console.error("repeat method must accept a boolean parameter") : null
			return
		}
		this.#repeating = bool
		this.#ao.loop = bool
	}

	repeatAB = (from, to) => {
		if (isNaN(from)) {
			this.#el ? console.error("\"RepeatAB()\" method takes only integer parameters.") : null
			return
		}

		if (isNaN(to)) {
			this.#el ? console.error("\"RepeatAB()\" method takes only integer parameters.") : null
			return
		}

		if (parseInt(from) >= this.#ao.duration) {
			this.#el ? console.error("Value of starting position of method \"repeatAB()\" is greater than the duration of the audio.") : null
			return
		}

		if (parseInt(to) > this.#ao.duration) {
			this.#el ? console.error("Value of ending position of method \"repeatAB()\" is greater than the duration of the audio.") : null
			return
		}

		if (parseInt(from) === parseInt(to)) {
			this.#el ? console.error("Value of starting position and ending position is equal in method \"repeatAB()\"") : null
			return
		}

		if (from > to) {
			this.#el ? console.error("Value of starting position is greater than the ending position of method \"repeatAB()\"") : null
			return
		}

		if (this.#repAB = true) {
			this.seekTo(from)
			this.#ABinter = setInterval(() => {
				if (parseInt(this.#ao.currentTime) >= parseInt(to)) this.seekTo(from)
			}, 200)
		}
	}

	dismissABrepeat = () => {
		this.#repAB = false
		clearInterval(this.#ABinter)
	}

	// -------------------------------------------------
	// -------------------------------------------------
	// -------------- QUEUE PUBLIC API's ---------------
	// -------------------------------------------------
	// -------------------------------------------------

	QUEUE = {
		set: obj => {
			if (typeof obj !== 'object') {
				this.#el ? console.error("set method of QUEUE must accept a parameter of type object") : null
				return
			}
			let tempQueue = []
			obj.map((item, index) => {
				if (item.src === undefined) {
					this.#el ? console.error("missing \"src\" value from the object at index " + index) : null
					return
				}
				this.#cq ? tempQueue.push(item) : tempQueue.push({ src: item.src })
			})
			this.#queue = tempQueue
			return true

		},

		play: index => {
			if (isNaN(index)) {
				this.#el ? console.error("play method of QUEUE must accept a parameter of type integer") : null
				return
			}
			if (index < 0 || index >= (this.#queue).length) {
				this.#el ? console.error("index out of range from method QUEUE.play()") : null
				return
			}
			this.stop()
			this.setAudio(this.#queue[index].src)
			this.#pifq = index
			this.play()
			return index
		},

		removeAll: () => this.#queue = [] && true,

		removeOne: index => {
			if (isNaN(index)) {
				this.#el ? console.error("play method of QUEUE must accept a parameter of type integer") : null
				return
			}

			if (index >= 0 && index < (this.#queue).length) {
				(this.#queue).splice(index, 1)
				return this.#queue
			}
		},

		getList: () => this.#queue
	}



	// -------------------------------------------------
	// -------------------------------------------------
	// ------- PUBLIC API's FOR GETTING THE DATA -------
	// -------------------------------------------------
	// -------------------------------------------------

	getCurrentTime = () => {
		if (!this.#ad) {
			this.#el ? console.warn("Unable to get current time of the audio.") : null
			return
		}
		return this.#ao.currentTime
	}

	getAudioDuration = () => {
		if (!this.#ad) {
			this.#el ? console.warn("Unable to get duration of the audio.") : null
			return
		}
		return this.#ao.duration
	}

	getVolumeLevel = () => this.#ao.volume * 100

	getAudioSource = () => this.#ad.src

	getAudioState = () => this.#playing ? 'play' : this.#paused ? 'pause' : this.#stopped ? 'stop' : 'unknown'

	// -------------------------------------------------
	// -------------------------------------------------
	// ------------- KEYBOARD KEYS BINDING -------------
	// -------------------------------------------------
	// -------------------------------------------------

	// PUBLIC METHOD
	listenKey = bool => {
		this.#kb = !!bool
	}

	// PRIVATE METHOD
	#keyListen = e => {
		let key = e.which
		switch (key) {
			case 115: // s => stop the audio
				this.stop()
				break

			case 112: // p => previous audio
				this.prev()
				break

			case 110: //n => next audio
				this.next()
				break

			case 109: // m => mute audio
				this.mute(!this.#muted)
				break

			case 114: // r => repeat one
				this.repeat(!this.#ao.loop)
				break

			case 32: // space bar => pause and play audio
				this.toggle()
				break

			case 43: // + button
				this.setVolume(this.getVolumeLevel() + 10)
				break

			case 45: // - (Minus) button
				this.setVolume(this.getVolumeLevel() - 10)
				break

			case 97: // a => set 'from' variable to repeat a to b 
				if (this.#repAB) {
					this.dismissABrepeat()
					return
				}
				this.#repA = parseInt(this.getCurrentTime())
				break

			case 98: // b => set 'to' variable to repeat a to b 
				if (this.#repAB) {
					this.dismissABrepeat()
					return
				}
				this.#repB = parseInt(this.getCurrentTime())
				this.#repAB = true
				this.repeatAB(this.#repA, this.#repB)
				break

		}
	}
}

window.MJS = new _MJS()