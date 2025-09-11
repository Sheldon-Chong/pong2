# ft_transcendence


to fix: 
- position is being streamed live. This creates a choppy effect. Need some form of smoothing effect


# todo

add a single-sync property type. Forms hash of client, and hash
of server. If hashes match, means they are synced, if not, request
for sync

Static properties that don't change. Means that onced they are single synced, they can be modified by the client side

add client-side onUpdate function that will be called by client
every iteration, and has no bearing on the server



create a request for game state function by client. ONCE client connects, it will request game state, so server isn't forced to send         only once.





1. parse  objects in search of components. export components seperate from game objects. 
2. Game objects now store ids to components
3. 

