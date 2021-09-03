const redis = require('redis')

console.log(redis); 

// it takes default host as localhost and port as 6379 
const client = redis.createClient()
// we can specify our other using redis.createClient(port , host)

client.on('connect', function(){
// listens to the connection event 
    console.log('Connected to redis')
})

// redis data types 
// strings 
// to store strings use : 
client.set('name', 'codernishchay'); 
// here key : name , value : codernishchay 
// set function also returns a callback : 
client.set('profession', 'software developer', function(err : Error, reply : any){
    console.log(reply);  // prints ok 
})
//getting data from redis 
client.get('profession', function(err: Error, reply: String){
    console.log(reply); // prints  software developer
}) 
// HASHES 
// to store hashes we use hmset 
client.hmset('framework', 'dart','flutter', 'node', 'express', 'css', 'tailwindcss', 'go', 'gin')

// getting hashes from redis
client.hgetall('framework', function(err : Error, object : Map<string,string>){
    console.log(object)
})

// redis dosent support nested objects 
// all the property values will be changed to string before getting stored

// to store objects in redis we can also use 

client.hmset('skills', {
    'cybersecurity': 'penetration tester', 
    'web' : 'full stack dev'
})

client.hgetall('skills', function(err: Error, object: Map<String,String>){
    console.log(object)
})

// storing lists in redis 
client.rpush(['frameworklist', 'next', 'express', 'flutter', 'gin','tailwind', 'scss' ], function(err: Error, list : number){
    console.log(list) // 6 : returns the lenght of list
})
// we can use lpush to push element to left instead of right. 
// to retrieve elements of list you can use : 

client.lrange('frameworklist', 0, -1, function(err:Error, object : Array<String>){
    console.log(object) 
})

// SET 

client.sadd(['frameworkset', 'next', 'anguler', 'flutter', 'flutter' ], function(er:Error, reply:number){
    console.log(reply) // returns length : 3 jwhy printing 0??? 
})


client.smembers('frameworkset', function(err:Error, reply: Array<String>){
    console.log(reply); // 
})

// https://www.sitepoint.com/using-redis-node-js/