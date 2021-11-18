# travelly
<br>

## Description
.travelly is an app that the user uses in order to plan a detailed trip. When visiting the app, the user will be aware of the perks of using this app and is invited to either sign up and/or log in. When logged in, the user will be able to start planning a new trip and/or continue working on the previously saved planned trip(s). A trip can be planned by adding the trip dates, followed by picking tourist attractions that are suggested by the app and can be added to the daily planner. A map can also be viewed with the selected tourist locations and the user is also able to search for a specific location and add it to its planner. 
<br>

## User stories
- **404** - As a user, I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user, I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **login-signup** - As a user, I want to see a welcome page that gives me the option to either log in as an existing user or sign up with a new account.
- **add-signup** - As a user, I want to sign up with my information so that I can safely plan my trips.
- **homepage** - As a user, I want to see places in the world where I can search and plan for my trip.
- **user-trips-profile** - As a user, I want to be able to add new trips and plan accordingly. I also want to check my travel history by viewing my past trip plans(only if I'm not a new user, obviously).
- **user-profile** - As a user, I want to check my profile information and be able to edit it, and add a profile picture. I also want to be able to choose where to go next, by clicking one of the different buttons available.
- **trip-picker** - As a user, I want to see options for travel destinations or go straight to search for a specific city.
- **trip-planner** - As a user, I want to insert the dates for my trip and add the tourist attractions I pick from the suggestions the app provides to me. I also want to add reminders of important things to keep in my for my trip.
- **map-viewer** - As a user, I want to see the tourist attractions I have in my planner showing up on the map with pinpoints. That will help me understand the distance between locations. Also, I'd like to be able to search for a specific location and add it to my planner.
- **flight-page** - [backlog] As a user, I'd like to check for the latest flight prices for my trip or even to plan future trips.

<br>

## API routes (back-end)

- GET / 
  - renders index.hbs

- GET /auth/signup
  - renders auth.hbs

- GET /auth............. ???????????
    

- POST /auth/signup
  - redirects to /profile  if user is logged in
  - renders auth.hbs
    - body: username, email, password, (google passport)

- GET /profile
  - renders profile.hbs
  
- GET /profile/edit
  - renders edit-profile.hbs
  - redirects to /profile

- GET /mytrips  
  - renders mytrips.hbs

- GET /destinations
  - renders destinations.hbs

- GET /map
  - renders map.hbs

- GET /flights
  - renders flights.hbs

- GET /errorpage
 - renders errorpage.hbs

- GET /notfound
 - renders notfound.hbs
  






- POST /auth/logout
  - body: (empty)

- GET /
  - renders homepage.hbs (the profile preview + search form)
- POST /homepage (search action)
  - body: 
    - game-title
    - console
- GET /game-search-results
  - renders game-search-results.hbs
  - includes the list of games
  - redirects to / if user presses button
- GET /rent-form/:id
  - renders rent-form.hbs
  - redirects to /game-search-results if user presses button
- POST /rent-form/:id
  - body: 
     - days
     - price update
- GET /success
  - renders success.hbs
  - redirects to / if user presses button
  
- GET /profile
  - renders user-profile.hbs
  - redirects to / if user presses button
- POST /profile (to edit profile)
  - redirects to /add-signup (we reuse it but for edit purposes)
  - body:
    - email
    - password
    - full name
    - birthday
    - gender
    - address
    - phone
    - cardInfo
    - typeOfCard
    - cardNumber
    - expDate
    - CVV
- POST /profile (to add game)
  - body:
    - game title
    - console
    - price
    - max days of rent
- GET /profile
  - renders user-profile.hbs updated
  - redirects to / if user presses button
- GET /notifications
  - renders notifications.hbs
  - redirects to / if user presses button
- GET /success (for renter)
  - renders success.hbs
  - redirects to /notifications if user presses button

<br>

## Models
 
    - user 
        new Schema ({
     	    _id: ,
     	    email: String, required: true, unique: true,
            password: String, minlength: 6, maxlength: 12,
     	    name: String, required: true, maxlength: 20
        })
    
    - trips
		new Schema ({
			_id: ,
			destination: {
                country : string, required: true, unique: true,
                city: string, required: true, unique: true,
                isAddded: boolean,
                acitivities: {
                    name: string, required: true,
                    img: string, required: true,
                    description: string                    
                }
            }
            date: {
                begginingDate: date,
                endDate: date
            }            
    })

    - favTrips 
        new Schema ({
     	    _id: ,
            user: [{
     	        ref: user, type: mongoose.Schema.Types.ObjectId,
            }]
            trips: [{
                ref: trips, type: mongoose.Schema.Types.ObjectId,
            }]            
        })
    

## Backlog

 - Mobile Responsiveness
    - Adapt the desktop layout to mobile version 
    
 - Footer
    - Add links to ours linked in profiles
    
 - Background
    - Animated background
    
 - Activities
    - Implement a pop up sheet with detailed information about each activity

 - Animations
    - Add more animations

 - Profile
    - Implement the option to change your account logs
    
<br>

## Links

### Trello[https://trello.com/b/gZUq22Ry/kanban-to-dos]

### Git[https://github.com/mariorui97/travelly] 

### figma[https://www.figma.com/file/UVGJmAEJcFodWOTMGN3DAA/Untitled?node-id=0%3A1]

### Slides
[Google Slides Link]