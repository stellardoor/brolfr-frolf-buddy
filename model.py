"""Data models for users, buddies(matches), and buddy chats, """

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    user_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    email = db.Column(db.String, unique = True)
    password = db.Column(db.String)
    fname = db.Column(db.String)
    pronouns = db.Column(db.String)
    gender = db.Column(db.String)
    birthday = db.Column(db.Date)
    location = db.Column(db.String)
    state = db.Column(db.String)
    member_since = db.Column(db.String)
    photo_link = db.Column(db.String)
    public_photo_id = db.Column(db.String)
    intro_text = db.Column(db.Text)
    calendar = db.Column(db.String)
    skill_level = db.Column(db.String)
    age_range = db.Column(db.String)
    frequented_courses = db.Column(db.Text)
    gender_preference = db.Column(db.String)
    kids_okay = db.Column(db.String)
    dogs_okay = db.Column(db.String)
    friendly_or_stakes_game = db.Column(db.String)
    type_of_game = db.Column(db.String)
    alcohol_okay = db.Column(db.String)
    tobacco_okay = db.Column(db.String)
    smoke_420_okay = db.Column(db.String)

    # buddy1 = db.relationship("Buddy", primaryjoin = "User.user_id == Buddy.user_id_1")
    # buddy2 = db.relationship("Buddy", primaryjoin = "User.user_id == Buddy.user_id_2")

    # buddy = db.relationship("Buddy", back_populates="user")
    # chat = db.relationship("Chat", back_populates="user")



    def __repr__(self):
        return f"<User user_id = {self.user_id} email = {self.email} name = {self.fname}>"

class Buddy(db.Model):
    __tablename__ = "buddies"
    buddy_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    user_id_1 = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    user_id_2 = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    pending = db.Column(db.Boolean)
    accepted = db.Column(db.Boolean)
    rejected = db.Column(db.Boolean)

    user1 = db.relationship("User", primaryjoin = "User.user_id == Buddy.user_id_1")
    user2 = db.relationship("User", primaryjoin = "User.user_id == Buddy.user_id_2")

#not working in this version:
    # user = db.relationship("User", back_populates="buddy") 
    # chat = db.relationship("Chat", backref="buddy")

    def __repr__(self):
        return f"<Buddy buddy_id = {self.buddy_id} user_id_1 = {self.user_id_1} user_id_2 = {self.user_id_2}>"
    

class Chat(db.Model):
    __tablename__ = "chats"
    chat_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    buddy_id = db.Column(db.Integer, db.ForeignKey("buddies.buddy_id"))
    sender_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    receiver_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))
    sender_name = db.Column(db.String)
    message = db.Column(db.Text)
    time_stamp = db.Column(db.String)
   
    buddy = db.relationship("Buddy", primaryjoin = "Buddy.buddy_id == Chat.buddy_id")
    sender = db.relationship("User", primaryjoin = "Chat.sender_id == User.user_id")
    receiver = db.relationship("User", primaryjoin = "Chat.receiver_id == User.user_id")

    def __repr__(self):
        return f"<Chat chat_id = {self.chat_id} buddy_id = {self.buddy_id}>"
    
class City(db.Model):
    __tablename__ = "cities"
    city_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    city = db.Column(db.String)
    state_id = db.Column(db.String)
    state_name = db.Column(db.String)
    county_fips = db.Column(db.String)
    county_name = db.Column(db.String)
    lat = db.Column(db.String)
    lng = db.Column(db.String)
    timezone = db.Column(db.String)
    zips = db.Column(db.String)

def connect_to_db(app): 
    """connecting to the database (I used information from SQLAlchemy lecture)"""

    app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql:///frolfers'
    app.config["SQLALCHEMY_ECHO"] = True
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = app
    db.init_app(app)

    #print statement to show terminal we are connected
    print("Connected to db :)")

if __name__ == "__main__": #importing app from server.py (flask)
    from server import app
    with app.app_context():
        connect_to_db(app)