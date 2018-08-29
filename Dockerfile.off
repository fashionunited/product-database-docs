# Stage 1 - the build process - gitlab CI does not support capitals or dashes in alias.
FROM node:8 as builddeps
WORKDIR /usr/src/app
COPY ./package.json ./package-lock.json .
RUN  npm i
COPY ./ .
RUN npm run build

# Stage 2 - the deployment
FROM node:8
RUN npm i -g firebase-tools --non-interactive
ARG FIREBASE_PROJECT_ID=qa
ARG FIREBASE_TOKEN=emptybydefault
WORKDIR /usr/src/app
COPY --from=builddeps /usr/src/app/landing/hugo /usr/src/app
RUN printenv
RUN firebase use $FIREBASE_PROJECT_ID 
RUN firebase deploy --only hosting
