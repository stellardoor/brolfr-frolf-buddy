// """functions loading all chatsssssss"""
function App() {
    const [buddyChat, setBuddyChat] = React.useState([]);
    const [button, setButton] = React.useState("Send Message");
    const user1 = document.querySelector("#user-1").value
    const user2 = document.querySelector("#user-2").value
    const buddyID = document.querySelector("#buddy-id").value

    // console.log([user1, user2, buddyID])

    React.useEffect(() => {
        function loadChatMessages() {
            console.log(buddyID)
            fetch("/load-buddy-chats", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "buddy-id": buddyID }),
                credentials: "same-origin"
            })
                .then(response => response.json())
                .then(resultList => {
                    const chatLogList = [];
                    for (const chat of resultList) {
                        if (chat.sender_id == user1) {
                            chatLogList.push(<LoadChatsRight chat={chat} user1={user1} key={chat.chat_id} />);
                        }
                        else {
                            chatLogList.push(<LoadChats chat={chat} user1={user1} key={chat.chat_id} />);
                        }
                    }
                    setBuddyChat(chatLogList)
                });
        }
        loadChatMessages();
        let id = setInterval(loadChatMessages, 10000);
        return () => { clearInterval(id) } //callback - when component unloads, stop timer
    }, []);


    const processSendMessage = (evt) => {
        evt.preventDefault()
        const sendMessage = document.getElementById("send-message").value;
        document.getElementById("send-message").value = ""
        // alert(sendMessage)
        const formInputs = {
            "receiver-id": user2,
            "send-message": sendMessage,
            "buddy-id": buddyID
        }

        fetch("/send-message", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formInputs),
            credentials: "same-origin"
        })
            .then((response) => response.text())
            .then((responseText => {
                setButton(responseText)
                setTimeout(
                    () => { setButton("Send Message!") },
                    3000)
            }))
    };


    return (
        <div>
            <div className="buddy-message">
                {buddyChat}
            </div>
            <div>
                <input type="text" id="send-message" name="send-message" />
                <button htmlFor="send-message" type="submit" onClick={(evt) => processSendMessage(evt)} > {button} </button>
            </div>
        </div>
    );
}



function LoadChats(props) {

    return (
        <div className="left-message">
            <img className="extra-tiny" src={props.chat.sender_link} ></img>
            <div className="bubble">
                <b>{props.chat.sender_name}: </b> {props.chat.message} </div>
            <small className="timestamp">{props.chat.time_stamp} </small>
        </div>
    )
}

function LoadChatsRight(props) {
    return (
        <div className="right-message">
            <div className="bubble">
                <b>{props.chat.sender_name}: </b> {props.chat.message}   </div>
            <img className="extra-tiny-right" src={props.chat.sender_link} ></img> 
            <small className="timestamp-right">{props.chat.time_stamp} </small>
        </div>
    )
}
