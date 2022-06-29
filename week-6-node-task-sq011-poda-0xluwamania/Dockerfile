FROM node:18.2.0

ENV NODE_ENV = development

WORKDIR /Users/decagon/Desktop/week-6-node-task-sq011-poda-0xluwamania

COPY package*.json ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 5000

CMD ["yarn", "serve"]
