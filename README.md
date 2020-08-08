# Express API server, MySQL service & Apline

## Run Docker stack

```sh
docker-compose up -d
```

## mysql

MySQL service is running on localhost:3306 and it's used by nodejs service to get a row from database. Database is pre populated with data from `./mysql/init.sql` script.

## nodejs

Starts express server with API endpoints at 
- <http://localhost:3008/task> gets data from database
- <http://localhost:3008/users> 
- <http://localhost:3008/users/:id>

## Alpine

has cURL & MySQL client

### Test nodejs & mysql service from alpine container

```
# docker exec -it alpine sh
/ # mysql -u root -p -h dbmysql
Enter password:
Welcome to the MariaDB monitor.  Commands end with ; or \g.

MySQL [(none)]> use sampledb;
Database changed
MySQL [sampledb]> select * from tasks;
+----+----------+
| id | title    |
+----+----------+
|  1 | get milk |
+----+----------+
1 row in set (0.00 sec)

MySQL [sampledb]> exit
Bye

/ # curl http://<your-public-ip>:3008/task
{"task":"get milk"}/ #
/ # curl http://nodejs:3008/task
{"task":"get milk"}/ #
/ # exit
```

### Test mysql service

```
# docker exec -it mysql bash
root@25d62f1a9d34:/# mysql -u root -p -h mysql
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.

mysql> use sampledb;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> exit
Bye
root@25d62f1a9d34:/# exit
```

