FROM centos:centos6

# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm

# Install Node.js and npm
RUN     yum install -y npm

# Bundle app source
RUN mkdir /dfx
RUN cd /dfx
RUN mkdir {path}
RUN cd /

COPY ./dep/app.js /dfx/{path}/
COPY ./dep/package.json /dfx/{path}/
ADD dep/fsdb /dfx/{path}/fsdb/
ADD dep/deploy /dfx/{path}/deploy/
ADD auth /dfx/auth/

# Install app dependencies
RUN cd /dfx/{path}; npm install

EXPOSE 3030
CMD ["node", "/dfx/{path}/app.js"]