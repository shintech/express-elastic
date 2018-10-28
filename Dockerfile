FROM node:8.12.0

EXPOSE 8000:8000

WORKDIR /shintech

COPY . .

RUN rm -rv node_modules .next log --force && \
  mkdir -p log && \
  wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 && \
  chmod +x /usr/local/bin/dumb-init  

RUN printf "Installing dependencies...\n" &&\
  yarn install

CMD dumb-init npm run start
