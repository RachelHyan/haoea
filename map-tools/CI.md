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
--name mroglo_homepage_front_tools \
--network cs \
-e JENKINS_AGENT_WORKDIR=/home/data/jenkins/agent \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /home/data/online/web:/usr/share/nginx \
-v /home/data/jenkins/agent/mroglo_homepage_front_tools:/home/jenkins/agent \
-v /home/centos/ubuntu/jenkins/ctl/mroglo_homepage_front_tools:/var/lib/jenkins \
-u root \
--init nebula11235/littaro-jenkins-pnpm:latest \
-url https://ci.littaro.cn \
-workDir=/var/lib/jenkins f8fb39bbdf446f51b955feba386ad1c3157402425a788a185204a5ac32bba40a mroglo_homepage_front_tools

docker logs -f mroglo_homepage_front_tools --tail 200
````
