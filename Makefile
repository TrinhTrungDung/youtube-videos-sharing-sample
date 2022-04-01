.DEFAULT_GOAL := help

# Generates a help message. Borrowed from https://github.com/pydanny/cookiecutter-djangopackage.
help: ## Display this help message
	@echo "Please use \`make <target>' where <target> is one of"
	@perl -nle'print $& if m{^[\.a-zA-Z_-]+:.*?## .*$$}' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m  %-25s\033[0m %s\n", $$1, $$2}'

start: ## Bring up the application on local environment
	docker-compose up -d --build

stop: ## Stop the current application
	docker-compose down

clean: ## Bring down the application on local environment, remove all docker related stuffs as well
	docker-compose down -v --remove-orphans