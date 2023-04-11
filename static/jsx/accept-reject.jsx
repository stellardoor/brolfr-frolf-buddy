// """functions for accepting and rejecting buddy requests"""
function App() {
    const [users, setUsers] = React.useState([])

    React.useEffect(() => {
        fetch("/get-requests")
            .then(response => response.json())
            .then(result => {
                setUsers(result);
                // console.log(result)
            });
    }, []);
    const userRequests = [];
    for (const user of users) {
        userRequests.push(<LoadRequest  user ={user} key={user.user_id} />);
    }
    return (
        <div>
             <div className="container">
                <div className="row justify-content-center p-3">
                    {userRequests}
                    </div>
                    </div>
        </div>
    );
}

function LoadRequest(props) {

    const [click, setClick] = React.useState(false);
    const [BuddyAccept, setBuddyAccept] = React.useState("Accept Buddy Request!");
    const [BuddyDeny, setBuddyDeny] = React.useState("Deny!")
    const [showModal, setShowModal] = React.useState(false);


    function clickAccept() {
        const data = {"buddy-accept-id": props.user.user_id}
        // console.log(data)
        fetch("/accept-buddy", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "same-origin" //sends the cookies with it
        })
            .then(response => response.text())
            .then(result => {
                setBuddyAccept(result)
                setBuddyDeny("🤩🤩🤩")
                setClick(true)
            });
    }
    function clickDeny() {
        fetch("/deny-buddy", {
            method: 'POST',
            body: JSON.stringify({"buddy-deny-id": props.user.user_id}),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "same-origin" //sends the cookies with it
        })
            .then(response => response.text())
            .then(result => {
                setBuddyDeny(result)
                setBuddyAccept("😭😭😭")
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
                            <button type="button" className="btn btn-primary app" data-bs-toggle="modal" data-bs-target={`#${props.user.user_id}`} data-bs-whatever={props.user.user_id} onClick={handleOpen} >View More</button><br></br><br></br>
                            <button className="app" disabled={click} type="submit" onClick={clickAccept}> {BuddyAccept} </button>

                            <button className="app" disabled={click} onClick={clickDeny} type="submit" > {BuddyDeny} </button>

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
                                            <button className="app" disabled={click} type="submit" onClick={clickAccept}> {BuddyAccept} </button>


                                            <button className="app" disabled={click} onClick={clickDeny} type="submit" > {BuddyDeny} </button>
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





{/* <div>
<h1>{props.user.fname}</h1>
<img className="profile" src= {props.user.photo_link} ></img>
<li> {props.user.gender}, {props.user.age} </li>
<li> Located in {props.user.location}</li>
<p> {props.user.intro_text}</p>
<ul>
    <li>Joined {props.user.member_since}</li>
    <li>Looking to throw with: {props.user.gender_preference}</li>
    <li>Availability: {props.user.calendar}</li>
    <li>Skill Level: {props.user.skill_level}</li>
    <li>Frequented Courses: {props.user.frequented_courses}</li>
    <li>Kids: {props.user.kids_okay}</li>
    <li>Dogs: {props.user.dogs_okay}</li>
    <li>Friendly/Stakes: {props.user.friendly_or_stakes_game}</li>
    <li>Game preference: {props.user.type_of_game}</li>
    <li>Alcohol: {props.user.alcohol_okay}</li>
    <li>Tobacco: {props.user.tobacco_okay}</li>
    <li>420 Friendly: {props.user.smoke_420_okay}</li>
</ul>

<button className="app" disabled={click} type="submit" onClick={clickAccept}> {BuddyAccept} </button>

<br></br>
<button className="app" disabled={click} onClick={clickDeny} type="submit" > {BuddyDeny} </button>
</div> */}