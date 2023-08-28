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
--name citybase_mes_front_prod \
-e JENKINS_AGENT_WORKDIR=/home/data/jenkins/agent \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /home/citees/online/web/mes:/usr/share/nginx \
-v /home/citees/jenkins/agent/citybase_mes_front_prod:/home/jenkins/agent \
-v /home/citees/jenkins/ctl/citybase_mes_front_prod:/var/lib/jenkins \
-u root \
--init nebula11235/littaro-jenkins-pnpm:latest \
-url https://ci.littaro.cn \
-workDir=/var/lib/jenkins d070c19a83fd1691bc9e5b4b7395f67f69314ef7d4a709fc72038b5fb0701b61 citybase_mes_front_prod

docker logs -f mroglo_homepage_front_mes_dev --tail 200
````
