import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 5,
  duration: '30s',
};

export default function () {
  const res = http.get('https://www.volker-benders.de');
  check(res, { 'status 200': r => r.status === 200 });
  sleep(1);
}

