# Express API server, MySQL service & Alpine

## Run Docker stack in dev mode

```sh
cp .env.sample .env
```

set MYSQL_ROOT_PASSWORD in .env file

```sh
docker-compose up
```

### mysql

MySQL service is running on localhost:3306 and it's used by nodejs service to get a row from database. Database is pre populated with data from `./mysql/init.sql` script. You can connect mysql service to GUI client such as MySQL Workbench 'cause there is port forwarding.

### nodejs

Starts express server with API endpoints at 
- <http://localhost:3008/task> gets data from database
- <http://localhost:3008/users> 
- <http://localhost:3008/users/:id>

### Alpine

has cURL & MySQL client for testing connectivty inside cluster

### Test nodejs & mysql service from alpine container

```
# docker exec -it alpine sh
/ # mysql -u root -p -h dbmysql
Enter password:

MySQL [(none)]> use sampledb;
MySQL [sampledb]> select * from tasks;
+----+----------+
| id | title    |
+----+----------+
|  1 | get milk |
+----+----------+
1 row in set (0.00 sec)

MySQL [sampledb]> UPDATE tasks SET title = "feed parrot" WHERE id = 1;

MySQL [sampledb]> exit

Bye

/ # curl http://nodejs:3008/task
{"task":"feed parrot"}/ #
/ # exit
```

### Test mysql service

```
# docker exec -it dbmysql bash
root@25d62f1a9d34:/# mysql -u root -p -h dbmysql
Enter password:
mysql> use sampledb;
Database changed
mysql> exit
Bye
root@25d62f1a9d34:/# exit
```


## Run in prod mode

```sh
docker-compose --file docker-compose-prod.yml up

```

in prod version for service dbmysql port forwarding & expose keys are removed. 

mysql service is not avaliable outside Docker stack, it's accessibe only from nodejs service but not from MySQL Workbench.
