build:
	docker compose build

run:
	docker compose up -d

make down:
	docker compose down

logs-web:
	docker logs kecilin-cctv -f

logs-db:
	docker logs mongo-db -f

check-db:
	docker exec -it $$DB_HOST mongosh "mongodb://$(DB_USER):$(DB_PASSWORD)@$(DB_HOST):$(DB_PORT)/$(DB_NAME)"

prune:
	docker system prune -af --volumes

cnetwork:
	docker network create kecilin

fresh-start:
	make down && \
	make prune && \
	make build && \
	make cnetwork && \
	make run
