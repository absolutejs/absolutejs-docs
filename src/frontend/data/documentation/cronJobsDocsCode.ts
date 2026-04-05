export const cronBasicUsage = `\
import { Elysia } from 'elysia';
import { cron } from '@elysiajs/cron';

new Elysia()
  .use(
    cron({
      name: 'heartbeat',
      pattern: '*/10 * * * * *',
      run() {
        console.log('Heartbeat');
      }
    })
  )
  .listen(3000);`;
export const cronConfig = `\
import { Elysia } from 'elysia';
import { cron } from '@elysiajs/cron';

new Elysia()
  .use(
    cron({
      name: 'report',
      pattern: '0 0 9 * * 1-5',
      timezone: 'America/New_York',
      startAt: new Date('2026-04-01T00:00:00Z'),
      stopAt: new Date('2026-12-31T23:59:59Z'),
      maxRuns: 100,
      interval: 60,
      catch: true,
      run() {
        console.log('Generate weekday report');
      }
    })
  );`;
export const cronInstall = `\
bun add @elysiajs/cron`;
export const cronPatterns = `\
import { Elysia } from 'elysia';
import { cron, Patterns } from '@elysiajs/cron';

new Elysia()
  .use(
    cron({
      name: 'every-second',
      pattern: Patterns.everySecond(),
      run() {
        console.log('Every second');
      }
    })
  )
  .use(
    cron({
      name: 'weekday-5pm',
      pattern: Patterns.everyWeekdayAt('17:00'),
      run() {
        console.log('Weekday at 5 PM');
      }
    })
  );`;
export const cronStopJob = `\
import { Elysia } from 'elysia';
import { cron } from '@elysiajs/cron';

const app = new Elysia()
  .use(
    cron({
      name: 'heartbeat',
      pattern: '*/1 * * * * *',
      run() {
        console.log('Heartbeat');
      }
    })
  )
  .get('/stop', ({ store: { cron: { heartbeat } } }) => {
    heartbeat.stop();
    return 'Stopped heartbeat';
  })
  .listen(3000);`;
