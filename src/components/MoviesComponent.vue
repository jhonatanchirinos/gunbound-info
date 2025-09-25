<script setup lang="ts">
import MovieRow from  './MovieRow.vue'

const peliculas = [
  {
    id: 1,
    title: 'Inception',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
  },
  {
    id: 2,
    title: 'Interstellar',
    poster: 'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
  },
  {
    id: 3,
    title: 'The Dark Knight',
    poster: 'https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  },
  {
    id: 4,
    title: 'Avatar',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/kyeqWdyUXW608qlYkRqosgbbJyK.jpg',
  },
  {
    id: 5,
    title: 'Joker',
    poster: 'https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
  },
  {
    id: 6,
    title: 'The Matrix',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/tpW2X2DvxtTHJ61iJ7zNYYrJihs.jpg',
  },
  {
    id: 7,
    title: 'Titanic',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
  },
  {
    id: 8,
    title: 'The Avengers',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
  },
  {
    id: 9,
    title: 'Spider-Man 2',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/aGuvNAaaZuWXYQQ6N2v7DeuP6mB.jpg',
  },
  {
    id: 10,
    title: 'Harry Potter and the order of the Phoenix',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/xxXiM2Ij7plbzibKWW9BfDk23aI.jpg',
  },
  {
    id: 11,
    title: 'Parasite',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
  },
  {
    id: 12,
    title: 'Spider-Man: Across the Spider-Verse',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
  },
  {
    id: 13,
    title: 'Guardians of the Galaxy Vol. 3',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg',
  },
  {
    id: 14,
    title: 'Dune',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
  },
  {
    id: 15,
    title: 'The Lion King',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg',
  },
  {
    id: 16,
    title: 'Frozen',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/mbPrrbt8bSLcHSBCHnRclPlMZPl.jpg',
  },
  {
    id: 17,
    title: 'Coco',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/lUZZhYLLDU4g4XGQ5tvjYNVytxc.jpg',
  },
  {
    id: 18,
    title: 'Toy Story',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/jvn7wy3RSNEXnFSXLpH2of2LcV6.jpg',
  },
  {
    id: 19,
    title: 'Finding Nemo',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/xVNSgrsvpcAHPnyKf2phYxyppNZ.jpg',
  },
  {
    id: 20,
    title: 'London has fallen',
    poster: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/iEbLkYzyiUdOKNK4WNBFyGH7r2Y.jpg',
  },
]
</script>

<template>
  <div class="app">
    <MovieRow title="Populares en Perú" :movies="peliculas" />
    <MovieRow title="Nuevas en tendencia" :movies="peliculas" />
  </div>
</template>

<style scoped>
.app {
  padding: 20px;
  background-color: #141414;
  color: white;
  font-family: sans-serif;
}
</style>
