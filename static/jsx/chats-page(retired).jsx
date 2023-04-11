// """loads chat page for user"""
function App() {
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        fetch("/get-buddies")
            .then(response => response.json())
            .then(result => {
                setUsers(result);
                console.log(result)
            });
    }, []);
    const userChats = [];
    for (const user of users) {
        // userRequests.push(<loadRequests item = {user} key={user.user_id}/>);
        userChats.push(<LoadRequest user={user} key={user.user_id} />);
    }
    return (
        <div>
            {userChats}
        </div>
    );
}

function LoadRequest(props) {

    return (
        <div>
            <img className="tiny" src={props.user.photo_link} ></img>

            <a className = "button" href={props.user.chat_link} type="button" > Chat with {props.user.fname}! </a>
        </div>
    );
}