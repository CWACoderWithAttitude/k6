test:
	docker run --rm -i \
    	  -v .:/scripts \
	  grafana/k6 run /scripts/volker-benders.de.js
start:
	docker compose up -d influxdb grafana
run: start
	docker compose run k6

