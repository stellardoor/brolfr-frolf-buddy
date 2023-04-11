"""adding users to test and """

import os # operating system - establishes interaction between the user and the operating system


import crud
import model
from random import choice, sample
from datetime import date
import json
from passlib.hash import argon2
from server import app

os.system("dropdb frolfers")
os.system("createdb frolfers")


# model.connect_to_db(server.app) #connecting to server.py flask
# model.db.create_all() #creating all tables

# i just want to add users!
#adding test users below:
mario_test_users = ["Wario", "Luigi", "Yoshi", "Peach", "Goomba", "Bowser", "Birdo", "Toad", "Mario", "Hammerbro", "Toadette", "Waluigi", "Daisy"]

def add_test_users():
    for user in mario_test_users:
        email = f"{user}@testing.com".lower()
        password = argon2.hash("testing")
        fname = f"{user}"
        pronouns = choice(["(She/Her)", "(He/Him)", "(They/Them)", "(He/They)", "(She/They)", ""])
        gender = choice(["Man", "Woman", "Non-Binary", "Man", "Woman"])
        birthday = choice(["12/25/1989", "1/2/2000", "3/6/1975"])
        member_since = date.today().strftime("%b %d, %Y")


        user = crud.create_user(email, password, fname, pronouns, gender, birthday, member_since)
    #     model.db.session.add(user)

    # model.db.session.commit()

# with app.app_context():

def add_profile_specifics():
    """adding specifics to the users profile"""
    for user in mario_test_users:
        user = crud.get_user_by_email(f"{user.lower()}@testing.com")
        user.photo_link = f"/static/images/{user.fname.lower()}.jpeg"
        user.public_photo_id = "eh2czragl5gdnhj1ie9w"
        user.intro_text = f"Hi, I'm {user.fname}! Let's Play!"
        user.calendar = '["Evenings (5pm - Sunset)"]'
        user.location = choice(["Sacramento", "San Francisco", "San Diego", "Oakland", "Roseville"])
        user.state = "California"
        user.skill_level = choice(["Beginner", "Intermediate", "Advanced"])
        age_range_choice = sample(["18-25", "26-30", "31-35", "36-40", "41-50", "51+"], 3)
        user.age_range = json.dumps(age_range_choice)
        user.frequented_courses = choice(["Hooker Oak", "Peregrine Point", "Golden Gate Park", "Oyster Bay", "John Mackey", "Bijou", "Lagoon Valley", "Anderson Valley", "Your mom"])
        user.gender_preference = choice(["Men", "Women", "All Genders"])
        user.kids_okay = choice(["Yes", "No", "No Preference"])
        user.dogs_okay = choice(["Yes", "No", "No Preference"])
        user.friendly_or_stakes_game = choice(["Friendly game", "Stakes game", "Friendly and Stakes"])
        user.type_of_game = choice(["Full Course", "Front 9", "Back 9", "No Preference"])
        user.alcohol_okay = choice(["Yes", "No", "No Preference"])
        user.tobacco_okay = choice(["Yes", "No", "No Preference"])
        user.smoke_420_okay = choice(["Yes", "No", "No Preference"])

        model.db.session.commit()

def seed_city_data(filename):
    # city_data = {}
    with open (filename) as file:
        for line in file:
            city_details = line.strip().split(",")
            city = city_details[0]
            state_id = city_details[1]
            state_name = city_details[2]
            county_fips = city_details[3]
            county_name = city_details[4]
            lat = city_details[5]
            lng = city_details[6]
            timezone = city_details[7]
            zips = city_details[8].strip().split(" ")
        
            city = crud.create_city(
                city,
                state_id,
                state_name,
                county_fips,
                county_name,
                lat,
                lng,
                timezone,
                zips
            )
            model.db.session.add(city)

    model.db.session.commit()
    

with app.app_context():
    model.connect_to_db(app)
    model.db.create_all()
    add_test_users()
    add_profile_specifics()
    seed_city_data("static/data/usa_city_data.txt")
    


# # is __name__ == .... needed here?
# if __name__ == "__main__":#importing app from server.py (flask)
#     from server import app
#     with app.app_context():
#         model.connect_to_db(app)
#         model.db.create_all() #creating all tables