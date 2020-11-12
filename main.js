
// The current screen viewed by the user
// Certain button presses changes this variable
// It is used in the render function to determine what to display to the user
let currentView = "signup-or-login"



let signupOrLoginView = () => {
    //  You will need to modify this function
    let container = document.createElement("div")
    let loginButton = document.createElement("button")
    loginButton.innerText = "login"
    let signupButton = document.createElement("button")
    signupButton.innerText = "signup"
    signupButton.addEventListener("click", () => {
        currentView = "signup"
        render()
    })

    container.appendChild(loginButton)
    container.appendChild(signupButton)

    return container
}

let signupView = () => {
    //  You will need to modify this function

    let container = document.createElement("div")

    let usernameInput = document.createElement("input")
    let passwordInput = document.createElement("input")
    let submitButton = document.createElement("button")
    submitButton.innerText = "submit"
    submitButton.addEventListener('click', () => {
        let username = usernameInput.value
        let password = passwordInput.value
        // JSON.stringify converts a JavaScript value to a string
        let bodyToBeSent = JSON.stringify({ username, password })
        // fetch is covered in depth in the slides
        // You will need to replace PASTE_THE_URL_FROM_GLITCH with your glitch server url
        fetch("PASTE_THE_URL_FROM_GLITCH/signup", { method: "POST", body: bodyToBeSent })
            .then(response => {
                return response.text()
            })
            .then(body => {
                // putting a debugger statement here might be useful
                console.log("received from /login  " + body)
                // JSON.parse converts a string to a JavaScript value
                // For this particular server, you always need to call it.
                let parsed = JSON.parse(body)
                if (!parsed.success) {
                    alert("signup not successful")
                } else {
                    alert("signup successful")
                }
            })
    })

    container.appendChild(usernameInput)
    container.appendChild(passwordInput)
    container.appendChild(submitButton)
    return container

}


// Rerenders the page
let render = () => {
    // Will contain a reference 
    let toRender = undefined
    // For debugging purposes
    console.log("rendering view", currentView)
    if (currentView === "signup-or-login") {
        toRender = signupOrLoginView()
    } else if (currentView === "signup") {
        toRender = signupView()
    } else {
        // woops
        alert("unhandled currentView " + currentView)
    }

    // Removes all children from the body
    document.body.innerHTML = ""
    document.body.appendChild(toRender)
}

// Initial render
render()