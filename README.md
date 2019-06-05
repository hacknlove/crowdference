# With traefik

## docker-compose

```
  webapp:
    restart: always
    image: hacknlove/crowdference-webapp:latest
    logging:
      driver: "json-file"
      options:
        max-size: "200k"
        max-file: "10"
    environment:
      PORT: 3000
    expose:
      - 3000
    env_file: ./environment.sh
    networks:
      - web
      - default
    labels:
      - "traefik.port=3000"
      - "traefik.enable=true"
      - "traefik.frontend.rule=Host:example.com"
      - "traefik.docker.network=web"
```

## environment.sh
```
MONGO_URL="..."
MONGO_OPLOG_URL="..."
ROOT_URL=https://example.com/
```
