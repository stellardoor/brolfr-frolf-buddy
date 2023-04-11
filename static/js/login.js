// """loads login and processes"""
// """Functions for Account edit form"""
// 'use strict';

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

const loginForm = document.querySelector('#login-form')


loginForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formInputs = {
        "email" : document.querySelector("#email").value, 
        "password" : document.querySelector("#password").value
    };

    console.log(formInputs)

    fetch('/process-login', {
        method: 'POST',
        body: JSON.stringify(formInputs),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin"
    })
        .then((response) => response.text())
        .then((responseAccount) => {
            console.log(responseAccount)
            if (responseAccount === "success") {
                document.querySelector("#ben").innerHTML='<img class="rotate-once ben" src="/static/images/bb.png"></img><br><span>Hell yeah, letsssgo!</span><br><br>';
                delay(2500).then(() => {
                    window.location.href="/home"
                })
            }
            else {
                document.querySelector("#ben").innerHTML = '<img class="shake ben-mad" src="/static/images/bb-mad.png"></img><br><span class="red-fail"> Wrong email or password!</span>';
                document.querySelector("#password").value = ""
                delay(2000).then(() => {
                    document.querySelector("#ben").innerHTML='<img class="ben" src="/static/images/bb.png"></img><br><span>Oopy Doopy. Try again. </span><br><br>';
                })
            }
        })
            
        })

