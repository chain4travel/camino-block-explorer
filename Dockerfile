ARG BUILD_ENV="build:dev"

FROM node:16 as build-stage-explorer
ARG BUILD_ENV
WORKDIR /app/camino-block-explorer

COPY ./ /app/camino-block-explorer/
RUN yarn install
RUN yarn $BUILD_ENV


FROM node:16 as build-stage-suite
ARG BUILD_ENV
WORKDIR /app
ARG SUITE_BRANCH=suite
RUN git clone -b $SUITE_BRANCH https://github.com/chain4travel/camino-suite.git
WORKDIR /app/camino-suite
RUN yarn install
RUN yarn $BUILD_ENV


FROM node:16 as build-stage-wallet
ARG BUILD_ENV
WORKDIR /app
ARG WALLET_BRANCH=suite
RUN git clone -b $WALLET_BRANCH https://github.com/chain4travel/camino-wallet.git
WORKDIR /app/camino-wallet
RUN yarn install
RUN yarn $BUILD_ENV


FROM nginx:1.18
COPY --from=build-stage-suite /app/camino-suite/dist/ /usr/share/nginx/html
COPY --from=build-stage-explorer /app/camino-block-explorer/dist/ /usr/share/nginx/html/explorer
COPY --from=build-stage-wallet /app/camino-wallet/dist/ /usr/share/nginx/html/wallet
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY ./nginx.conf /etc/nginx/conf.d/default.conf