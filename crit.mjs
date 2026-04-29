import { generate } from 'critical';

await generate({
  base: './',
  src: 'src/pages/home-page/index.html',
  target: {
    css: 'src/pages/home-page/index-critical.css',
  },
  width: 1300,
  height: 900,
});