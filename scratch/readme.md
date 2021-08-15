# Back end

1. express app server

BaseUrl: https://swapi.dev/api/
- Endpoints:
	- all SWAPI actors name
	/characters
	
	
	return JSON [{"name":"polo","url":"https://swapi.dev/api/people/1"},...]

	
	- actor details
	characters/:name

	call BaseUrl + '?search' + req.params[name]

- 404

** cors issue