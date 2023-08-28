## Jenkins
```shell
docker run -itd \
--restart=always \
--network online \
-v db-acme-certs:/root/certs \
-v /home/data/online/config/nginx/sites-enabled:/etc/nginx/conf.d/sites-enabled \
-v /home/data/online/config/nginx/tcp-enabled:/etc/nginx/conf.d/tcp-enabled \
-v /home/data/online/web:/usr/share/nginx \
--name nginx \
-p 80:80 \
-p 443:443 \
nebula11235/littaro-nginx:1.2

docker run -itd \
--privileged=true \
--name citybase_pioneer_front_prod \
-e JENKINS_AGENT_WORKDIR=/home/data/jenkins/agent \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /usr/share/nginx:/usr/share/nginx \
-v /home/data/jenkins/agent/citybase_pioneer_front_prod:/home/jenkins/agent \
-v /home/centos/ubuntu/jenkins/ctl/citybase_pioneer_front_prod:/var/lib/jenkins \
-u root \
--init nebula11235/littaro-jenkins-pnpm:latest \
-url https://ci.littaro.cn \
-workDir=/var/lib/jenkins 1c187ce5894db86498a226a79d434df194599e95f5847a92dd23c9fad37bf95b citybase_pioneer_front_prod

docker logs -f citybase_pioneer_front_prod --tail 200
````
