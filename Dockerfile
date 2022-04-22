FROM node:14-alpine

WORKDIR /app
COPY package.json package-lock.json ./

# building iltorb
RUN apk add --no-cache --virtual builds-deps build-base python2 && \
npm install && \
apk del builds-deps

COPY . .

ENV G_PORT=3002
ENV PORT=3000

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
