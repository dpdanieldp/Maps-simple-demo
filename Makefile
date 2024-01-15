SHELL := /bin/bash


.PHONY: up
up:
	@echo 'starting Maps in Docker...'
	docker-compose --env-file ./backend/.env.example up --build
