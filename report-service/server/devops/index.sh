docker run --restart=always -p 127.0.0.1:27050:27017 --hostname mongo-test --name mongo-test -d mongo --setParameter failIndexKeyTooLong=false \\
docker run --restart=always --name mysql-test -e MYSQL_ROOT_PASSWORD=report-service-pwd -e MYSQL_USER=report-service-user -d mysql
docker run --restart=always -d -p 8086:8086 -v $PWD/temp:/var/lib/influxdb influxdb