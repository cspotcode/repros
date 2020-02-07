FROM ubuntu:latest
RUN apt-get update -y && apt-get install curl git -y
RUN curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o /usr/local/bin/n && chmod +x /usr/local/bin/n && n lts
RUN npm install -g yarn
# Now node, npm, and yarn are available
ENTRYPOINT []
CMD []
