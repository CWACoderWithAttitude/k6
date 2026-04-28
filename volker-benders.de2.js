import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 10 }, // Ramp-up
    { duration: '40s', target: 10 }, // Hold
    { duration: '10s', target: 0 },  // Ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% der Requests < 500ms
    http_req_failed: ['rate<0.01'],   // <1% Fehler
  },
};

export default function () {
  const res = http.get('https://www.volker-benders.de');

  check(res, {
    'Status 200': r => r.status === 200,
    'Body nicht leer': r => r.body && r.body.length > 0,
  });

  sleep(1);
}

