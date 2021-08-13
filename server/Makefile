NAME := cloudtab-server

docker-build:
	docker build --no-cache --rm -t $(NAME) .

docker-run:
	docker run -d -p 3000:3000 cloudtab-server:latest
