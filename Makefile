build-dev:
	docker compose build

run-dev:
	docker compose up -d

logs-web:
	docker logs kecilin-cctv -f

logs-db:
	docker logs mongo-db -f

check-db:
	docker exec -it $(DB_HOST) mongosh "mongodb://$(DB_HOST):$(DB_PORT)/$(DB_NAME)"