FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g pnpm

RUN pnpm install

COPY . .

RUN pnpm db:generate

RUN pnpm run build

EXPOSE 3000

CMD ["node", "dist/main"]
