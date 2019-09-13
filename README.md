# insurance-company

## To Run in terminal

npm install
npm run server

## To Test in Postman

POST ROUTE TO GET TOKEN

@route       POST /
@desc        Get token for admin account
@access      Public

POST Request to "/" with the following JSON to get token:

{
	"name": "Britney",
	"password": ""
}

this will return a token (if the user is an admin)


	CLIENT ROUTES

@route       GET /users/id/:user_id
@desc        Get user by user_id
@access      Public

GET Request to "/users/id/:user_id"

@route       GET /users/username/:user_name
@desc        Get user by user_name
@access      Public

GET Request to "/users/username/:user_name"

@route       GET /users/policy/:policy_id
@desc        Get user by policy_id
@access      Private

GET Request to "/users/policy/:policy_id"
  Add "x-auth-token" Header with the token as a value


	POLICIES ROUTES

@route       GET /policies/user/:user_name
@desc        Get policies by user_name
@access      Private

GET Request to "/policies/user/:user_name"
  Add "x-auth-token" Header with the token as a value
