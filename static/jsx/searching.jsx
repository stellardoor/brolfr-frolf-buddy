function LoadCities() {

    const alertLiveLocation = document.getElementById("live-alert-for-location")

    // const [userState, setUserState] = React.useState("")
    // const [userCity, setUserCity] = React.useState("")

    // React.useEffect(() => {
    //     fetch("/get-user-state", {
    //     method: 'POST'
    // })
    //     .then(response => response.text())
    //     .then(stateResponse=> {
    //         setUserState(stateResponse)
    //         }  
    //     );
    //     });

    // React.useEffect(() => {
    //     fetch("/get-user-city", {
    //     method: 'POST'
    // })
    //     .then(response => response.text())
    //     .then(cityResponse=> {
    //         setUserCity(cityResponse)
    //         }  
    //     );
    //     });

    const [cityNames, setCityNames] = React.useState([])
    const [stateNames, setStateNames] = React.useState([])

    React.useEffect(() => {
        fetch("/get-states")
            .then(response => response.json())
            .then(stateList=> {
                const states = []
                for (const state of stateList) {
                    states.push(<option value={state} key={state} >{state}</option>);
                }
                setStateNames(states)
            });
    }, []);


    const captureUserInput = (evt) => { //idk how capture ???

        fetch("/load-cities", {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "user-state": evt.target.value}),
            credentials: "same-origin"
        })
            .then((response) => response.json())
            .then((responseCities) => {
                const cityList = []
                for (const city of responseCities) {
                    cityList.push(<option  value={city} key={city} >{city}</option>);
                }
                setCityNames(cityList)
                document.querySelector("#user-location").defaultValue=""
            })
            
    
    };

    const processUserLocation = (evt) => { //idk how capture ???
        evt.preventDefault()
        const stateInput = document.querySelector("#user-state").value
        const cityInput = document.querySelector("#user-location").value
        const formInputs = { 
            "user-state": stateInput, 
            "user-location" : cityInput
        }
        
        fetch("/process-city-state", {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formInputs),
            credentials: "same-origin"
        })
            .then((response) => response.json())
            .then((responseSubmit => {
                if (responseSubmit.includes("Error")){
                    alert("Error: Please select city from dropdown after selecting the US state.", "danger")
                }
                else {
                document.getElementById("current-location").innerHTML = `Current Location: ${cityInput}, ${stateInput}. `
                alert("Successfully updated location!", "success")
            }
            }))    
    };

    // alert - taken from bootstrap site:::

    const alert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
          `<div class="alert alert-${type} alert-dismissible" role="alert">`,
          `   <div>${message}</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>'
        ].join('')
      
        alertLiveLocation.append(wrapper)
      }

    return (
        <div>
            <form>
                <select onChange={(evt)=>captureUserInput(evt)} name="user-state" id="user-state">
                    <option selecteddisabledhidden="true" >Select State </option>
                    {stateNames} 
                </select><br></br>
            </form>
            <form>
                <label htmlFor="user-location" className="form-label">City: </label>
                <input className="form-control" list="datalistOptions" name="user-location" id="user-location" placeholder="Type to search your closest city..."></input>
                <datalist id="datalistOptions">
                    {cityNames}
                </datalist>
                <input className="app" type ="submit" onClick={(evt)=> processUserLocation(evt)} ></input>
            </form>
            <div id="live-alert-for-location"></div>
        </div>
    )

};
