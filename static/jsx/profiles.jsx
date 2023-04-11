// """loading profiles to search potential buds"""
function App() {
    const [users, setUsers] = React.useState([]);
    // const [results, setResults] = React.useState("Showing profiles matching your location");
    // const [loadingCircle, setLoadingCircle] = React.useState(true)

    // if (loadingCircle) {
    //     document.querySelector("")
    // }

    React.useEffect(() => {
        fetch("/load-profiles")
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setUsers(result);
            });
    }, []);
    const userProfiles = [];
    for (const user of users) {
        userProfiles.push(<LoadRequest user={user} key={user.user_id} />);
    }

    const loadAllProfiles = (evt) => { //idk how capture ???
        evt.preventDefault()
        document.getElementById("show-results").innerText = ""

        fetch("/load-all-profiles")
            .then((response) => response.json())
            .then((responseSubmit => {
                setUsers(responseSubmit)

            }));
    }

    return (
        <div>
            <small className = "results-small" >Showing all profiles <small id="show-results"> matching your location </small> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick = {loadAllProfiles} className="app" > Load all profiles</button></small>
            <div id="cities">
                <LoadCities setUsers={setUsers} />
            </div>

          
            <div className="container">
                <div className="row justify-content-center p-3">
                    {userProfiles}
                </div>
            </div>
     
        </div>
    );
}

function LoadRequest(props) {

    const [click, setClick] = React.useState(false);
    const [SendBuddyRequest, setSendBuddyRequest] = React.useState("Send Buddy Request!");
    const [showModal, setShowModal] = React.useState(false);

    function clickSendRequest() {
        fetch("/send-buddy-request", {
            method: 'POST',
            body: JSON.stringify({ "user-request-id": props.user.user_id }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "same-origin" //sends the cookies with it
        })
            .then(response => response.text())
            .then(result => {
                setSendBuddyRequest(result)
                setClick(true)
            });
    }

    const handleClose = () => {
        setShowModal(false);
    };
    const handleOpen = () => {
        setShowModal(true);
    };


    return (
        <div>
            <div className="col-12 col-md-6 ">
                <div className="brolfr-card" >
                                <img className="profile" src={props.user.photo_link} ></img>
                                <h4 className="">{props.user.fname} <small style={{ fontSize: "small" }}>{props.user.pronouns} </small></h4>
                                <p className="">
                                    {props.user.gender}, {props.user.age} 🌳 {props.user.location}, {props.user.state}  <br></br>
                                    {props.user.intro_text}
                                </p>
                               
                                <br></br>
                                <button type="button" className="btn btn-primary app" data-bs-toggle="modal" data-bs-target={`#${props.user.user_id}`} data-bs-whatever={props.user.user_id} onClick={handleOpen} >View More</button><br></br>
                                <button className="app" disabled={click} onClick={clickSendRequest} type="submit" > {SendBuddyRequest} </button>

                                <div className={`modal fade ${showModal ? "show" : ""}`} 
                                id="exampleModal" tabIndex="-1" aria-labelledby={`modal-label-${props.user.user_id}`} aria-hidden={!showModal} style={{ display: showModal ? "block" : "none" }}>
                                    <div className="modal-dialog">
                                        <div className="modal-content" style={{
                                        fontSize: "large",
                                        border: "1px solid rgba(14, 79, 79)",
                                        backgroundColor: "rgba(245, 255, 245)",
                                        textAlign: "center"
                                }} >
                                            <div className="modal-header">
                                                <h5 className="modal-title" id={`modal-label-${props.user.user_id}`}>{props.user.fname}</h5>
                                                <button type="button" className="btn-close" onClick={handleClose}></button>
                                            </div>
                                            <div className="modal-body">
                                                <ul>
                                                    <li><b>Joined:</b> {props.user.member_since}</li>
                                                    <li><b>Looking to throw with:</b> {props.user.gender_preference}</li>
                                                    <li><b>Age Range:</b> {props.user.age_range}</li>
                                                    <li><b>Availability:</b> {props.user.calendar}</li>
                                                    <li><b>Skill Level:</b> {props.user.skill_level}</li>
                                                    <li><b>Frequented Courses:</b> {props.user.frequented_courses}</li>
                                                    <li><b>Kids:</b> {props.user.kids_okay}</li>
                                                    <li><b>Dogs:</b> {props.user.dogs_okay}</li>
                                                    <li><b>Friendly/Stakes:</b> {props.user.friendly_or_stakes_game}</li>
                                                    <li><b>Game preference:</b> {props.user.type_of_game}</li>
                                                    <li><b>Alcohol:</b> {props.user.alcohol_okay}</li>
                                                    <li><b>Tobacco:</b> {props.user.tobacco_okay}</li>
                                                    <li><b>420 Friendly:</b> {props.user.smoke_420_okay}</li>
                                                </ul>
                                                <div className="modal-footer">
                                                    <button className="app" disabled={click} onClick={clickSendRequest} type="submit" > {SendBuddyRequest} </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
    
                            </div>

                        </div>
                    </div>
                </div>
   
        
    );
}

function LoadCities(props) {

    // const [initialState, setInitialState] = React.useState("")
    // const [initialCity, setInitialCity] = React.useState("")
    const [userState, setUserState] = React.useState("")
    // const [userCity, setUserCity] = React.useState("")
    const [cityNames, setCityNames] = React.useState([])
    const [stateNames, setStateNames] = React.useState([])

    // React.useEffect(() => {
    //     fetch("/get-user-state", {
    //         method: 'POST'
    //     })
    //         .then(response => response.text())
    //         .then(stateResponse => {
    //             setInitialState(stateResponse)
    //         }
    //         );
    // });

    // React.useEffect(() => {
    //     fetch("/get-user-city", {
    //         method: 'POST'
    //     })
    //         .then(response => response.text())
    //         .then(cityResponse => {
    //             setInitialCity(cityResponse)
    //         }
    //         );
    // });


    React.useEffect(() => {
        fetch("/get-states")
            .then(response => response.json())
            .then(stateList => {
                const states = []
                for (const state of stateList) {
                    states.push(<option value={state} key={state} >{state}</option>);
                }
                setStateNames(states)
            });
    }, []);



    const captureUserInput = (evt) => { //idk how capture ???
        evt.preventDefault()
        const userInput = evt.target.value
        setUserState(userInput)
        fetch("/load-cities", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "user-state": userInput }),
            credentials: "same-origin"
        })
            .then((response) => response.json())
            .then((responseCities) => {
                const cityList = []
                let i = 0
                for (const city of responseCities) {
                    cityList.push(<option value={city} key={i} >{city}</option>);
                    i += 1
                }
                setCityNames(cityList)

            })
        document.querySelector("#user-location").defaultValue = ""
    };


    const processProfilesByState = (evt) => { //idk how capture ???
        evt.preventDefault()
        document.getElementById("show-results").innerText = ` matching ${userState}`

        fetch("/load-users-by-state", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "user-state": userState }),
            credentials: "same-origin"
        })
            .then((response) => response.json())
            .then((responseSubmit => {
                props.setUsers(responseSubmit)

            }));
    }

    


    const processProfilesByCity = (evt) => {
        evt.preventDefault()
        const cityInput = document.querySelector("#user-location").value
        document.getElementById("show-results").innerText = ` matching ${cityInput} ${userState}`
        const formInputs = {
            "user-state": document.querySelector("#user-state").value,
            "user-location": document.querySelector("#user-location").value
        }

        fetch("/load-users-by-city", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formInputs),
            credentials: "same-origin"
        })
            .then((response) => response.json())
            .then((responseSubmit => {
                if (responseSubmit.includes("Error")) {
                    document.querySelector("#user-location").value= ""
                    alert("ERROR: Please choose a valid city from the dropdown list after selecting a state", "danger")
                }
                else {
                    console.log(responseSubmit)
                    props.setUsers(responseSubmit);
                }
            }));

    };

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

    const processProfilesByCalendar = (evt) => {
        evt.preventDefault()
        document.getElementById("show-results").innerText = " matching calendar"
        const calendarInfo = document.querySelectorAll(".calendar")
        console.log(calendarInfo)
        const calendarList = [];
        for (const input of calendarInfo) {
            if (input.checked) {
                calendarList.push(input.value);
            }
        }
        console.log(calendarList)
        const formInputs = {
            "user-state": document.querySelector("#user-state").value,
            "user-location": document.querySelector("#user-location").value,
            "calendar": calendarList
        }


        fetch("/load-users-by-calendar-match", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formInputs),
            credentials: "same-origin"
        })
            .then((response) => response.json())
            .then((responseSubmit => {
                console.log(responseSubmit)
                props.setUsers(responseSubmit);
            }));

    };

    return (
        <div>
            <div className="container-search-profiles">
                <div className="container-fluid">
                    <div className="row justify-content-center p-3">
                        <div className="col-12 col-xl-4" >
                            <div className="flex" >
                                <select className="form-control" style={{ width: "250px", border: ".7px solid rgba(14, 79, 79, .6)" }} onChange={(evt) => captureUserInput(evt)} name="user-state" id="user-state">
                                    <option selecteddisabledhidden="true" >Select State</option>
                                    {stateNames}
                                </select>
                                <button style={{ width: "250px" }} className="app" type="submit" onClick={(evt) => processProfilesByState(evt)}>Search by State</button><br></br>
                            </div>
                        </div>

                        <div className="col-12 col-xl-4" >

                            <label htmlFor="datalist" hidden={true} className="form-label"></label>
                            <input style={{ width: "300px", border: ".7px solid rgba(14, 79, 79, .6)" }} className="form-control" list="datalistOptions" name="user-location" id="user-location" placeholder="Type to search a city..." ></input>
                            <datalist id="datalistOptions">
                                {cityNames}
                            </datalist>
                            <button style={{ width: "250px" }} className="app" htmlFor="user-location" name="user-location" type="submit" onClick={(evt) => processProfilesByCity(evt)} >Search by City</button>
                            <div id="live-alert-location"></div>
                        </div>



                        <div className="col-12 col-xl-4" >
                            <div className="container-fluid" id="calendar">
                                <div className="row">
                                    <div className="col-12 col-xl-6">
                                        <input type="checkbox" name="calendar" className="calendar" id="early-mornings" value="Early Mornings (Sunrise - 8am)" ></input>
                                        <label htmlFor="early-mornings" className="medium-size">  Early Bird <small className="small-type">(Sunrise - 8am) </small> </label><br></br>
                                        <input type="checkbox" name="calendar" className="calendar" id="mornings" value="Mornings (8am - 11am)" ></input>
                                        <label htmlFor="mornings" className="medium-size"> Mornings <small className="small-type"> (8am - 11am)</small> </label><br></br>
                                        <input type="checkbox" name="calendar" className="calendar" id="afternoons" value="Afternoons (11am - 2pm)"></input>
                                        <label htmlFor="afternoons" className="medium-size"> Afternoons <small className="small-type"> (11am - 2pm)</small> </label><br></br>
                                    </div>
                                    <div className="col-12 col-xl-6">
                                        <input type="checkbox" name="calendar" className="calendar" id="late-afternoon" value="Late Afternoons (2pm - 5pm)"></input>
                                        <label htmlFor="late-afternoons" className="medium-size"> Late Afternoons <small className="small-type"> (2pm - 5pm)</small> </label><br></br>
                                        <input type="checkbox" name="calendar" className="calendar" id="evenings" value="Evenings (5pm - Sunset)" ></input>
                                        <label htmlFor="evenings" className="medium-size"> Evenings <small className="small-type">(5pm - Sunset) </small></label><br></br>
                                    </div>
                                    <button className="app" htmlFor="calendar" name="calendar" type="submit" onClick={(evt) => processProfilesByCalendar(evt)} >Filter by Calendar</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}

// --------------- test user calendar filter----------
// function LoadCalendar(props) {

//     const processProfilesByCalendar = (evt) => {
//         evt.preventDefault()
//         const calendarInfo = document.querySelectorAll(".calendar")
//         console.log(calendarInfo)
//         const calendarList = [];
//         for (const input of calendarInfo) {
//             if (input.checked) {
//                 calendarList.push(input.value);
//             }
//         }
//         console.log(calendarList)
//         const formInputs = {
//             "user-state": document.querySelector("#user-state").value,
//             "user-location": document.querySelector("#user-location").value,
//             "calendar": calendarList
//         }


//         fetch("/load-users-by-calendar-match", {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(formInputs),
//             credentials: "same-origin"
//         })
//             .then((response) => response.json())
//             .then((responseSubmit => {
//                 console.log(responseSubmit)
//                 props.setUsers(responseSubmit);
//             }));

//     };



