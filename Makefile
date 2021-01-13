.PHONY: build server artifacts dev

build:
	yarn build

server:
	gunicorn -b $(host):$(port) -w $(workers) server:app

dev:
	gunicorn -b 0.0.0.0:5000 -w 1 server:app --reload &
	yarn run start

artifacts:
	python prepare-artifacts.py