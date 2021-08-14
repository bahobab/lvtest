# Back end

1. express app server

BaseUrl: https://swapi.dev/api/
- Endpoints:
	- all SWAPI actors name
	/
	
	call BaseUrl + req.path + '?search=?'

	>create helper function to compile users
	
	return JSON [{"name":"polo","url":"https://swapi.dev/api/people/1"},...]

	
	- actor details
	/:name

	call BaseUrl + '?search' + req.params[name]

	
