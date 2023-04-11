// """Functions for Account edit form"""
// 'use strict';

const accountCreateForm = document.querySelector('#create-account-form')


accountCreateForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formInputs = {
        "fname" : document.querySelector("#fname").value,
        "pronouns": document.querySelector("#pronouns").value,
        "gender": document.querySelector("#gender").value,
        "birthday": document.querySelector("#birthday").value,
        "password":document.querySelector("#password").value,
        "email":document.querySelector("#email").value,
    };

    console.log(formInputs)

    fetch('/create-new-account', {
        method: 'POST',
        body: JSON.stringify(formInputs),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin"
    })
        .then((response) => response.text())
        .then((responseAccount) => {
            alert(responseAccount);
            window.location.href="/login"
        })
    });