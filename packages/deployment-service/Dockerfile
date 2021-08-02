# FROM node:14
FROM public.ecr.aws/lambda/nodejs:14

ARG FUNCTION_DIR="/var/task"
RUN mkdir -p ${FUNCTION_DIR}

## TODO modernise docker build process here

# RUN npm i -g yarn

# RUN yarn build

COPY . /var/task

RUN ls -la

RUN ["chmod", "+x", "/var/task/packages/deployment-service/container-dist/taskRunner.js"]
RUN ["chmod", "+x", "/var/task/packages/deployment-service/container-dist/taskPopulation.js"]

WORKDIR "/var/task/packages/deployment-service/dist/"
