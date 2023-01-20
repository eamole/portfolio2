// this is a module
'use strict'
/*
    it turns out, import is an async function, and therefore returns a Promise!!
    therefore, to ensure the contents of the module are immediately available
    after the import, we use await, which blocks the thread until the import promise resolves - ie loads!!
*/
// this is a wrapper/replacement for the usual detect dom ready code 
window.domReady = (cb) => {
    document.addEventListener("DOMContentLoaded", () => {
        cb()
    })
}

let loadSideNav = () => {
    fetch("./side-nav.html") // load the html for the side nav - async
    .then(resp => resp.text())  // extract the text from the response object - async
    .then( html => {
        $("#side-nav-container").html(html) // insert the 
    })
    .then( () => {
        // select all a elements (within nav) and add a click handler  
        $("#side-nav-container a").on( 'click', function(ev) { // use function syntax to access "this" ie the link
            ev.preventDefault() // stop the click doing anything eg following a link
            // get the href out of the element
            let href = this.href    // "this" is the actual <a> element, because of the func syntax
            let hash = href.split('#')[1];  // get just the hash part of the href

            // use a separate folder to hold the answers/solutions/samples
            let url = "/answers/" + hash            // look in the folder same name as hasg
            fetch(url)
            .then(resp => resp.text())
            .then(html => {
                $("#canvas-container").html(html)    // add that content to canvas portion of page
            })
        })
    })
} 

/*
    This is BAD practice:
        I'm declaring a global variable
        I'm assuming a global object called "window"
        ....
*/
domReady(loadSideNav)   // load the side-nav.html when the main document has loaded

