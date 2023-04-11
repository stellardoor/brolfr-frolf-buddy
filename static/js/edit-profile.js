// """Functions for Profile edit form"""
// 'use strict';

const profileForm = document.querySelector('#edit-profile-form')

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


profileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const ageRange = document.querySelectorAll(".age-range")
    const calendarInfo = document.querySelectorAll(".calendar")

    console.log(ageRange)
    const ageRangeList = [];
    for (const input of ageRange) {
        if (input.checked) {
            ageRangeList.push(input.value); 
        }
        }
    console.log(ageRangeList)
    // const ageRangeListDumps = json.dumps(ageRangeList)

    console.log(calendarInfo)
    const calendarList = [];
    for (const input of calendarInfo) {
        if (input.checked) {
            calendarList.push(input.value); 
        }        
    }
    console.log(calendarList)
    // const calendarListDumps = json.dumps(calendarList)

    const formInputs = {
        // "user-state" : document.querySelector("#user-state").value,
        // "user-location": document.querySelector("#user-location").value,
        "intro-text": document.querySelector("#intro-text").value,
        "calendar" :calendarList,
        "skill-level": document.querySelector("#skill-level").value,
        "age-range" : ageRangeList,
        "frequented-courses" : document.querySelector("#frequented-courses").value,
        "gender-pref": document.querySelector("#gender-pref").value,
        "kids-ok": document.querySelector("#kids-ok").value,
        "dogs-ok": document.querySelector("#dogs-ok").value,
        "friendly-stakes": document.querySelector("#friendly-stakes").value,
        "game-type": document.querySelector("#game-type").value,
        "alcohol-ok": document.querySelector("#alcohol-ok").value,
        "tobacco-ok": document.querySelector("#tobacco-ok").value,
        "smoke-420-ok": document.querySelector("#smoke-420-ok").value
    };

    console.log(formInputs)

    fetch('/process-edit', {
        method: 'POST',
        body: JSON.stringify(formInputs),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin"
    })
        .then((response) => response.text())
        .then((responseProfileEdit) => {
            alert(responseProfileEdit, "success");
        })
    });