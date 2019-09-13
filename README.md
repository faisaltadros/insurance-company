# insurance-company

## To Run in terminal

npm install
npm run server

## To Test in Postman

	POST ROUTE TO GET TOKEN

- route       POST /
- desc        Get token for admin account
- access      **Public**

POST Request to "/" with the following JSON to get token:

{
	"name": "Britney",
	"password": ""
}

this will return a token (if the user is an admin)


	CLIENT ROUTES

- route       GET /users/id/:user_id
- desc        Get user by user_id
- access      **Public**

GET Request to "/users/id/:user_id"

- route       GET /users/username/:user_name
- desc        Get user by user_name
- access      **Public**

GET Request to "/users/username/:user_name"

- route       GET /users/policy/:policy_id
- desc        Get user by policy_id
- access      **Private**

GET Request to "/users/policy/:policy_id"
  Add "x-auth-token" Header with the token as a value


	POLICIES ROUTES

- route       GET /policies/user/:user_name
- desc        Get policies by user_name
- access      **Private**

GET Request to "/policies/user/:user_name"
  Add "x-auth-token" Header with the token as a value
  
  
  	Decisions
	
Most of my experience with backend involved using a database such as MongoDB, although when I was given the data in json format I was not clear on what was needed for the API. I made the decision to parse the JSON and use that as the database and not save it into a database of its own. I made chose this mainly because I had no experience in doing so and I took it as a challenge to build something different. 

Although, I believe using a database would give me more control over the data and if I was asked to add more route (Post, Put or Delete) I would use one.

If you would like to see some of my other code where I built a more extensive backend with full RESTful routes, you can visit these repositories:

https://github.com/faisaltadros/realed
https://github.com/faisaltadros/dev-connector
