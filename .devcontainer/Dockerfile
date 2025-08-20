FROM mcr.microsoft.com/devcontainers/typescript-node:20

# Install additional OS packages
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    git \
    curl \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Install global npm packages
RUN npm install -g npm@latest

# Set the default shell to bash instead of sh
ENV SHELL /bin/bash
