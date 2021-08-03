FROM public.ecr.aws/lambda/nodejs:14

## TODO modernise docker build process here

# RUN npm i -g yarn

# RUN yarn build

COPY . /var/task

WORKDIR /var/task/dist/taskPopulation/src

RUN ls -la

CMD ["index.taskPopulation"]

RUN pwd
