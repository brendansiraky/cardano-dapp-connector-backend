# cardano-dapp-connector-backend

An example of authentication by reading from a token that was signed via a users Cardano wallet that implements the wallet connector standard [CIP30](https://cips.cardano.org/cips/cip30/).

Check out a live working demo of this [here](cardanodappconnector.tech).

Check out the repo for the frontend [here](https://github.com/brendansiraky/cardano-dapp-connector).

## Requirements
- Docker and Docker Compose.
- Either a Nami, Eternl, Flint or Gero Wallet.

## Setup

Build the docker image.
```bash
docker build -t brendansiraky/cardano-dapp-connector-backend .
```

Start the container.
```bash
docker-compose up
```