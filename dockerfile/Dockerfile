ARG BASE_PRIVATE_REGISTRY=""
FROM ${BASE_PRIVATE_REGISTRY}hkube/base-node:v1.1.1
LABEL maintainer="maty21@gmail.com"
RUN mkdir /hkube
COPY . /hkube/monitor-server-listener
RUN cd /hkube/monitor-server-listener
WORKDIR /hkube/monitor-server-listener
CMD ["node", "app.js"]
