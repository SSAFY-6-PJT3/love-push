# nginx 이미지를 사용합니다. 뒤에 tag가 없으면 latest 를 사용합니다.
FROM node:16-alpine as builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build


FROM nginx as production

ENV NODE_ENV production

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/defualt.conf

EXPOSE 81

CMD ["nginx", "-g", "daemon off;"]