/*

    this is the web worker code

    it can receive a number of messages
    start - start the timer
    stop - stop the timer

    the web worker has no access to the DOM, so it will send a message 
    back to the main script every 1000ms with the current elapsed time

*/

let timer // declare out here so accessible to all functions
let _start = Date.now() // ms since 1970

let msToMinsSecs = (millis) => {
    var mins = Math.floor(millis / 60000);
    var secs = ((millis % 60000) / 1000).toFixed(0);
    return {    // return an object
        mins,
        secs
    }
  }

/*

    create a object with 2 methods start, stop

*/
let jumpTable = {
    elapsed () {
        let elapsed = Date.now() - _start
        let msg = msToMinsSecs(elapsed)
        postMessage(JSON.stringify(msg))    // need to convert to string/json to semd 
        return msg
    },
    start () {
        timer = setInterval(() => {
            this.elapsed()
        },
        1000)   // every 1000ms = 1sec
        
    },
    stop () {
        clearInterval(timer)
        this.elapsed()
    }
}
// this receive the message from the main thread
onmessage = (ev) => {
    console.log('worker receives msg', ev.data)
    let msg = ev.data  
    // use the message to call the correct method in the jumpTable
    jumpTable[msg]()

}



