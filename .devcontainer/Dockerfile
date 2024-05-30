ARG VARIANT=v1.23.0-focal
FROM mcr.microsoft.com/playwright:${VARIANT}

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# The playwright image comes with a base non-root 'pwuser' user which this Dockerfile
# gives sudo access. However, for Linux, this user's GID/UID must match your local
# user UID/GID to avoid permission issues with bind mounts. Update USER_UID / USER_GID
# if yours is not 1000. See https://aka.ms/vscode-remote/containers/non-root-user.
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Update and install packages, configure shells, configure npm, etc
RUN apt-get update \
    #
    # Ensure base apt utilities are present
    && apt-get -y install --no-install-recommends apt-utils dialog 2>&1 \
    #
    # Verify git and needed tools (mostly for playwright testing) are installed
    && apt-get -y install git iproute2 procps curl apt-transport-https lsb-release libgtkextra-dev libgconf2-dev libnss3 libasound2 libxtst-dev sudo \
    #
    # Install and setup ZSH for root and non-root users
    && apt-get -y install --no-install-recommends zsh \
    && chsh -s $(which zsh) root \
    && chsh -s $(which zsh) pwuser \
    && curl -Lo /home/pwuser/oh-my-zsh-install.sh --create-dirs https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh \
    && chmod a+rx /home/pwuser/oh-my-zsh-install.sh \
    && su -c "RUNZSH=no CHSH=no /home/pwuser/oh-my-zsh-install.sh --unattended" - root \
    && su -c "RUNZSH=no CHSH=no /home/pwuser/oh-my-zsh-install.sh --unattended" - pwuser \
    #
    # Ensure npm saves exact versions
    && su -c "npm config set save-exact true" - root \
    && su -c "npm config set save-exact true" - pwuser \
    #
    # Configure global npm installs to use an unprivileged directory
    && su -c "mkdir -p /home/pwuser/.npm-globals" - pwuser \
    && su -c "npm config set prefix /home/pwuser/.npm-globals" - pwuser \
    #
    # Update a non-root user to match UID/GID - see https://aka.ms/vscode-remote/containers/non-root-user.
    && if [ "$USER_GID" != "1000" ]; then groupmod pwuser --gid $USER_GID; fi \
    && if [ "$USER_UID" != "1000" ]; then usermod --uid $USER_UID pwuser; fi \
    # Add add sudo support for non-root user
    && echo pwuser ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/pwuser \
    && chmod 0440 /etc/sudoers.d/pwuser \
    #
    # Clean up caches to reduce image size
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* \
    && rm -f /home/pwuser/oh-my-zsh-install.sh

# Switch back to dialog for any ad-hoc use of apt-get
ENV DEBIAN_FRONTEND=

# Use unprivileged user
USER pwuser

# Ensure unprivileged user's global node_modules are first on the path
ENV PATH=/home/pwuser/.npm-globals/bin:${PATH}

# Install project package managers
RUN npm install --location=global npm@8 pnpm@9
