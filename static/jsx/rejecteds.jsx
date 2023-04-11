// """functions loading all rejected folks"""
function App() {
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        fetch("/show-denied-buddies")
            .then(response => response.json())
            .then(result => {
                setUsers(result);
                console.log(result)
            });
    }, []);
    const userRejections = [];
    for (const user of users) {
        userRejections.push(<LoadRequest user={user} key={user.user_id} />);
    }
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center p-3">
            {userRejections}
            </div>
            </div>
        </div>
    );
}

function LoadRequest(props) {

    const [click, setClick] = React.useState(false);
    const [BuddyAcceptAgain, setBuddyAcceptAgain] = React.useState("Oops I still like this person, accept as a buddy again!");
    const [showModal, setShowModal] = React.useState(false);


    function clickAcceptAgain() {
        fetch("/accept-buddy-again", {
            method: 'POST',
            body: JSON.stringify({ "buddy-accept-again-id": props.user.user_id }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "same-origin" //sends the cookies with it
        })
            .then(response => response.text())
            .then(result => {
                setBuddyAcceptAgain(result)
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
                            <button disabled={click} onClick={clickAcceptAgain} type="submit" > {BuddyAcceptAgain} </button>

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
                                            <button disabled={click} onClick={clickAcceptAgain} type="submit" > {BuddyAcceptAgain} </button>
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