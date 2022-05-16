# SocNetAPI

SocNetAPI is a social network API (Application Programming Interface) that uses Express.js [Express](https://www.npmjs.com/package/express)for routing and a MongoDB database with the Mongoose ODM (Object Data Modeling) library ([Mongoose](https://www.npmjs.com/package/mongoose). In addition, the application uses native JavaScript `Date` to provide automatic timestamps for user-generated input.

The application is not deployed, but its GitHub repository can be found at [GitHub] https://github.com/mcleanGit/SocNetAPI.  A walkthrough video, linked to this README (below), outlines the technical criteria and demonstrates the functionality of the application using Insomnia.

## User Story

The API is developed for a context that might suit a social media startup. Specifically, it references an historical and historic grouping of renowned physicists Ralph Alpher, Hans Bethe, and George Gamow, who co-authored an important piece of cosmology research that became known, with due wit, as the 'alpha-beta-gamma' article. The application's hypothetical Users and Thoughts build on that, taking into account our new societal relation to the Greek alphabet in the time of the COVID pandemic. The API uses a NoSQL database to be able to (eventually) handle large and unstructured data.

## Application Description

The application is invoked from the command line with `npm start`, which connects to `node server.js` and syncs the Mongoose models to the MongoDB database. The models for the application are `User` and `Thought`. The third 'model', `Reaction`, is not a model but effects a subdocument schema in the Thought model. (See Models, further below).

Insomnia is used to test the routes for Users and Thoughts. API GET routes for Users and Thoughts are displayed in formatted JSON. GET routes are set up for all Users `(/api/users)` and all Thoughts `(/api/thoughts)`, and for a single User or single Thought retrieved by the auto-generated UserId or ThoughtId. 

New Users and Thoughts may also be created (POST) using those same API routes. Both may be updated (PUT) or deleted (DELETE) using the API routes tested in Insomnia with the appropriate generated UserId or ThoughtId `(api/users/userId)` or `(/api/thoughts/thoughtId)`. When a Thought is created the thoughtId is pushed to the thoughts array for that User. When a User is deleted, their associated thoughts are also deleted. (This responds to a 'bonus' challenge that uses `deleteMany` at line 72ff of the `controllers/thought-controller.js` file.)

In addition, Users (by userId) can have Friends added to (POST), or removed from (DELETE), their Friends list array `(/api/users/userId/friends)` and, for deletion, `(/api/users/userId/friends/friendId)`. These routes are also tested in Insomnia. When a Friend is created, the friendId is added to the User friends array. A `virtual` added to the User UserSchema model also appends a `friendCount` to the User data.

The parallel situation for Thoughts is Reactions. A Reaction may be added to (POST), or removed from (DELETE), a Thought (by thoughtId). As noted above, Reactions is a Schema-only model: the reactionId is generated using Mongoose's ObjectId data type. In Insomnia, this functionality is tested via API routes `(/api/thoughts/thoughtId/reactions)` and for deletion (`/api/thoughts/thoughtId/reactions/reactionId)`. A `virtual` added to the Thought ThoughtSchema model generates a `reactionCount` to the Thought data.

## Technical Elements
The application uses Express, MongoDB, and Mongoose, as well as the native JavaScript Date function as a utility to provide timestamps. The main components of the applications are Models, Controllers, and API Routes.

### Models
**User**
includes username (a UserId is autogenerated), email (with validation check), thoughts array, friends array, and a schema-settings virtual for friendCount.

**Thought**
includes thoughtText (a ThoughtId is autogenerated), createdAt(timestamp), username, a reactions array, and a virtual for reactionCount.

**Reaction**
includes reactionBody, username, createdAt(timestamp), and a reactionId autogenerated via Mongoose's ObjectId data type. As already noted, Reaction works, not as a separate model, but as a subdocument schema in the Thought model.

### Controllers
The major work of structuring CRUD methods (create, read, update, delete) for the database is handled by the `Controllers`.

**user-controller**
includes methods (with Mongoose format functions) to getUsers (User.find), getSingleUser (User.findOne)--populated with friends and thoughts, createUser (User.create), updateUser (User.findOneAndUpdate), and deleteUser (User.findOneAndDelete), as well as addFriend and removeFriend (both which are based on the User.findOneAndUpdate format).
Similarly...

**thought-controller**
includes methods (with Mongoose format functions) to getThoughts (Thought.find), getSingleThought (Thought.findOne), createThought (Thought.create), updateThought (Thought.findOneAndUpdate), and delete Thought (Thought.findOneAndDelete), as well as addReaction and deleteReaction (both of which are based on the Thought.findOneAndUpdate format).

### API Routes
As noted in the application description above, API routes are established for users (`/api/users`) to GET all, or GET single by `_id`, with the user's populated thought and friend data.  POST is used to create a new user with username and email JSON data input. PUT and DELETE routes update and delete user data based on userId. When a user is deleted, their associated thoughts are also deleted.

Similarly, API routes are established for thoughts (`/api/thoughts`) to GET all, or GET single by `_id`. POST is used to create a new thought with thoughtText and username JSON data input. PUT and DELETE routes update and delete thoughts data based on the thoughtId. When a thought is deleted, its associated reactions are also deleted.

All routes are tested in *Insomnia*, as demonstrated in the walkthrough video. (See link, below.)

## Review

The GitHub repository for the application is found at:
[GitHub Repo](https://github.com/mcleanGit/SocNetAPI)

A walkthrough video is found at:
[SocNetAPI-video] ToADD

- - -
© 2022 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.