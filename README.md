# mongo_node_tests
mongo practice code files!

# how to run
## start docker
- docker-compose up --build

## run test
- get another terminal
- docker exec mongo_node_tests_node_1 npm run test

## check mongo db
- get another terminal
- docker exec -it mongo_node_tests_mongo_1 bash
- mongo exec
- run mongo query
- show dbs
- use user_test
- db.users.find().pretty()
