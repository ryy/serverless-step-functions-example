FROM node:18.20.4-bullseye

RUN apt-get update && apt-get install -y \
    bash \
    curl \
    unzip \
    less \
    && rm -rf /var/lib/apt/lists/*

RUN ARCH=$(uname -m) && \
    if [ "$ARCH" = "x86_64" ]; then \
        curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"; \
    elif [ "$ARCH" = "aarch64" ]; then \
        curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip"; \
    fi && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -rf awscliv2.zip ./aws

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

CMD ["bash"]
