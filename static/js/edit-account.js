// """Functions for Account edit form"""
// 'use strict';

const accountForm = document.querySelector('#edit-account-form')

const alert = (message, type) => {
    const alertLocation = document.getElementById("live-alert-location")
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
  
    alertLocation.append(wrapper)
  }

accountForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formInputs = {
        "fname" : document.querySelector("#fname").value,
        "pronouns": document.querySelector("#pronouns").value,
        "gender": document.querySelector("#gender").value,
        "birthday": document.querySelector("#birthday").value,
    };

    console.log(formInputs)

    fetch('/process-edit-account', {
        method: 'POST',
        body: JSON.stringify(formInputs),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin"
    })
        .then((response) => response.text())
        .then((responseAccountEdit) => {
            alert(responseAccountEdit, "success");
        })
    });