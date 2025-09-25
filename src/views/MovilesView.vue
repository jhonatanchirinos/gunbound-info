<script setup lang="ts">
import MobileGB from '@/components/MobileGB.vue'
import { ref } from 'vue'
import { computed } from 'vue'

const mobileHeads = [
  {
    label: 'MECÁNICO',
    colspan: 6,
  },
  { label: 'ESCUDO', colspan: 6 },
  { label: 'BIÓNICO', colspan: 12 },
]

const mobileRows = [
  {
    head: 'EXPLOSIVO',
    icon: '💥',
    mobiles: [
      {
        img: 'armor',
        label: 'Armor',
        alt: 'ARMOR',
        colspan: 2,
        borderColor: '#ec441f',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'Cuando estalló la guerra, estos vehículos blindados se modificaron para aumentar su potencia de fuego y se vendieron como armas, desempeñando un papel importante en GunBound.',
      },
      {
        img: 'big_foot',
        label: 'Big Foot',
        alt: 'BIGFOOT',
        colspan: 2,
        borderColor: '#1643ab',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'Las armas explosivas multimisil fueron diseñadas para disparar múltiples misiles y mantener el calor bajo control.',
      },
      {
        img: 'shadow_walker',
        label: 'S. Walker',
        alt: 'SHADOWWALKER',
        colspan: 2,
        borderColor: '#90ccff',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'Puede desplazarse libremente por cualquier terreno y superar cualquier obstáculo con facilidad. Este móvil fue diseñado para explorar territorios inexplorados, pero ahora se enfrenta al combate como un potente móvil.',
      },
      {
        img: 'shark',
        label: 'Shark',
        alt: 'SHARK',
        colspan: 6,
        borderColor: '#366aae',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'El tiburón forma parte de un océano previamente desconocido en Lond, con el que los exploradores de Adium intentaron aliarse. El tiburón tenía muchas características distintivas que lo diferenciaban claramente de otras tribus descubiertas en el océano de Lond.',
      },
      {
        img: 'trico',
        label: 'Trico',
        alt: 'TRICO',
        colspan: 4,
        borderColor: '#fec455',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'Animal utilizado como transporte en las zonas cálidas de Miramo. Posee una fuerza inagotable y es fácil de manipular por los humanos.',
      },
      {
        img: 'wolf',
        label: 'Wolf',
        alt: 'WOLF',
        colspan: 4,
        borderColor: '#215A68',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'Los Lobos son una tribu de animales salvajes que se asentaron en Adium. Tienen su propia manada con sus propias reglas sociales.',
      },
      {
        img: 'dragon',
        label: 'Dragon',
        alt: 'DRAGON',
        colspan: 4,
        borderColor: '#8260F4',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'Se sabe que el Dragón se extinguió en la estrella de Ronde. Aparece en los mitos de Miramo y posee un enorme poder para fundir metal y puede volar por los cielos. No puede volar tan alto, pero sí puede atacar a otros móviles que se encuentren por debajo. Se rumorea que lo han visto en el juego GunBound.',
      },
    ],
  },
  {
    head: 'LÁSER',
    icon: '🔫',
    mobiles: [
      {
        img: 'aduka',
        label: 'Aduka',
        alt: 'ADUKA',
        colspan: 2,
        borderColor: '#908ef1',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'Aduka es un bot creado por la religión que cree en Thor. El nuevo Aduka móvil tiene un diseño similar al de la Máquina Nak y el arma eléctrica, pero usa el poder de Thor como arma principal. Por lo tanto, no puede infligir mucho daño a los oponentes cuando Thor está débil, pero puede ser tan fuerte que puede convertirse en el controlador de la victoria del equipo. Tiene una gran ventaja en los mapas con muchos turnos de Thor.',
      },
      {
        img: 'raon',
        label: 'Raon Launcher',
        alt: 'RAON',
        colspan: 2,
        borderColor: '#ffc400',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'En particular, un robot llamado Raon, que se ocultaba entre los demás restos, causó pesadillas a los investigadores. Adium usa a Raon como arma durante la guerra. La versión remodelada de RaonLancher también aparece en el juego GunBound.',
      },
      {
        img: 'knight',
        label: 'Knight',
        alt: 'KNIGHT',
        colspan: 2,
        borderColor: '#FFFF91',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'El antiguo templo de Lond contenía un plano de la Máquina de Destrucción. Los científicos de Adium sugirieron reconstruir la Máquina de Destrucción tras examinarla, pero los líderes de Adium decidieron construirla. Como arma de guerra, el Caballero ganó numerosas batallas, pero solo unas pocas pudieron construirse, ya que los materiales solo se encontraron en la Antigüedad. Por lo tanto, no se ven muchos caballeros en batalla.',
      },
      {
        img: 'mage',
        label: 'Mage',
        alt: 'MAGE',
        colspan: 3,
        borderColor: '#293E8D',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'El arma de luz de Adium estuvo en peligro de desaparecer al finalizar la guerra. Sin embargo, GunBound la rediseñó para finalmente integrarla en móviles. Mage también posee una máquina de recuperación de escudos de civilización antigua y huesos de metal especial.',
      },
      {
        img: 'asate',
        label: 'A. Sate',
        alt: 'ASATE',
        colspan: 3,
        borderColor: '#E27221',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'Los desarrolladores de Adium estaban interesados ​​en el satélite que orbita el cielo alrededor de Lond, y finalmente separaron el móvil que dispara al móvil inductor y el que dispara según el móvil inductor.',
      },
      {
        img: 'blue_whale',
        label: 'Blue Whale',
        alt: 'BLUEWHALE',
        colspan: 6,
        borderColor: '#2e67b6',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'Con la noticia de una nueva alianza entre el Tiburón y Adium, la Ballena Azul despertó su curiosidad. Entonces, a pesar de su naturaleza pacífica, propusieron una segunda alianza con Adium.',
      },
      {
        img: 'jfrog',
        label: 'J. Frog',
        alt: 'JFROG',
        colspan: 6,
        borderColor: '#48c673',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'Presumiblemente el ancestro de las ranas, J.Frog caza escupiendo gelatinas mortales que explotan después de cierto tiempo. Su energía explosiva es tan poderosa que puede derretir incluso el acero más resistente.',
      },
    ],
  },
  {
    head: 'ELÉCTRICO',
    icon: '⚡',
    mobiles: [
      {
        img: 'frank',
        label: 'Frank',
        alt: 'FRANK',
        colspan: 3,
        borderColor: '#405981',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'La verdadera identidad de Frank es prácticamente desconocida. Pero con solo ver las numerosas cicatrices en su rostro y el enorme tornillo que le sobresale de la cabeza, es bastante fácil adivinarla. Se rumorea que un médico en Adium realizó experimentos médicos con un cuerpo vivo para crear un nuevo guerrero mutado. ¿Podría ser Frank?',
      },
      {
        img: 'kalsiddon',
        label: 'Kalsiddon',
        alt: 'KALSIDDON',
        colspan: 3,
        borderColor: '#EC9C2E',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'Similar a Bigfoot, pero mejorado con tecnología de misiles teledirigidos. A diferencia de Bigfoot, que se especializa en disparos a quemarropa y derribar muros, Kalsiddon concentra sus múltiples misiles teledirigidos en un móvil gracias a su avanzada tecnología. También puede destruir el terreno al impactarlo antes de que los misiles se dividan en varios.',
      },
      {
        img: 'jd',
        label: 'J.D.',
        alt: 'JD',
        colspan: 2,
        borderColor: '#FF3E00',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'Tras el desarrollo de Lighting, se han desarrollado numerosas armaduras eléctricas. Especialmente con máquinas de tipo trueno, la dificultad de jugar en el escenario con forma de techo se ha superado gracias al desarrollo de la bomba eléctrica. Durante el desarrollo de la bomba eléctrica, se han desarrollado nuevas armas que utilizan sus características.',
      },
      {
        img: 'lighting',
        label: 'Lighting',
        alt: 'LIGHTING',
        colspan: 2,
        borderColor: '#3068dd',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'En la antigüedad, se creía que el clima podía cambiar por voluntad propia. En particular, la armadura que generaba una potente electricidad y la que invocaba el trueno se transformaron en armas y se usaron durante la guerra. Se contaba que el fin del mundo se debía a esta arma.',
      },
      {
        img: 'carrior',
        label: 'Carrior',
        alt: 'CARRIOR',
        colspan: 2,
        borderColor: '#886974',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'Durante la batalla, su cuerpo profundo aumenta la probabilidad de esquivar los disparos enemigos. De hecho, el diseño delgado y profundo de Carrior le permite moverse con rapidez. Nadie puede igualarlo en velocidad. Incluso si Carrior está oculto a tu vista, podría estar detrás de ti.',
      },
      {
        img: 'grub',
        label: 'Grub',
        alt: 'GRUB',
        colspan: 12,
        borderColor: '#E8B600',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'El único móvil biónico de Adium: Grub. Dentro del caparazón transparente y duro de Grub se encuentra el órgano interno brillante. Uno de los órganos almacena la electricidad y dispara la bala eléctrica llena de capas de aspecto marmóreo.',
      },
    ],
  },
  {
    head: 'FÍSICO',
    icon: '🛡️',
    mobiles: [
      {
        img: 'nak',
        label: 'Nak',
        alt: 'NAK',
        colspan: 6,
        borderColor: '#c53e02',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'Se ha desarrollado ingeniería mecánica para que los robots trabajen en minas peligrosas, y también se han realizado estudios sobre los pies de los robots y la búsqueda de suelo mediante oscilación.',
      },
      {
        img: 'phoenix',
        label: 'Phoenix',
        alt: 'PHOENIX',
        colspan: 2,
        borderColor: '#F32765',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'Los desarrolladores de Adium han creado una vez más una nueva criatura, inspirada en el Fénix, para combatir la inminente invasión del Dragón. Esta nueva criatura genéticamente modificada posee un gen duplicador con la capacidad de crear clones que duplican con creces sus habilidades.',
      },
      {
        img: 'maya',
        label: 'Maya',
        alt: 'MAYA',
        colspan: 2,
        borderColor: '#cc733d',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'Los mayas son conocidos por su estilo de vida nómada y su tenaz fuerza de voluntad. Su indomable voluntad se refleja claramente en su estilo de lucha.',
      },
      {
        img: 'princess',
        label: 'Princess',
        alt: 'PRINCESS',
        colspan: 2,
        borderColor: '#faf2ca',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'La Princesa es una viajera de un planeta extranjero. Cuando encuentra a alguien enfermo o herido, lo ayuda a curarse usando magia en secreto. Su estilo de combate es diferente al de otros móviles, así que descubrirás un nuevo interés.',
      },
      {
        img: 'boomer',
        label: 'Boomer',
        alt: 'BOOMER',
        colspan: 3,
        borderColor: '#764B2D',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'Desde tiempos inmemoriales, en Miramo se han desarrollado técnicas para secar maderas y huesos de animales y fijarlos. Se han utilizado diversas y sencillas herramientas de madera. El boomer se utilizaba para romper hielo y rocas en zonas altas y como arma durante la guerra.',
      },
      {
        img: 'ice',
        label: 'Ice',
        alt: 'ICE',
        colspan: 3,
        borderColor: '#CCD1D4',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'En Miramo, desde la época de la irrupción de la cultura, han utilizado el poder animal con gran sabiduría. Aparte de que la civilización de la maquinaria ha estado menos desarrollada, los animales han sido mucho más efectivos en el duro entorno del Norte que las máquinas. Especialmente la construcción y la guerra no habrían sido posibles sin el mamut.',
      },
      {
        img: 'turtle',
        label: 'Turtle',
        alt: 'TURTLE',
        colspan: 3,
        borderColor: '#327E34',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'La Tortuga de Miramo es un animal grande y de caparazón duro. Este pacífico animal marino atrajo la atención por su movilidad y su gran vitalidad desde el inicio del juego GunBound. Las tortugas de este juego fueron elegidas como las más fuertes entre todas las criadas por los humanos.',
      },
      {
        img: 'assassin',
        label: 'Assassin',
        alt: 'ASSASSIN',
        colspan: 3,
        borderColor: '#5c59ce',
        clickable: true,
        secondColor: '#FFFFFF',
        info: 'Si te encuentras con el Assassin, ya estás perdido. El Assassin pertenece al Escuadrón de Asesinatos de Lond y nunca ha fallado en su tarea. Pero después de ganar, al fin y al cabo, el Asesino se fue solo.',
      },
    ],
  },
  {
    head: 'RANDOM',
    icon: '❓',
    mobiles: [
      {
        img: 'random',
        label: 'Random',
        alt: 'RANDOM',
        colspan: 24,
        borderColor: '#FF7100',
        clickable: false,
        secondColor: '#FFFFFF',
        info: 'RANDOM',
      },
    ],
  },
]

const selectedMobile = ref(null)

const selectedMobileInfo = computed(() => {
  const result = mobileRows
    .flatMap((row) => row.mobiles)
    .find((mobile) => mobile.label === selectedMobile.value)

  return result
})
</script>

<template>
  <!-- CONTENIDO MÓVILES -->
  <div class="flex flex-col gap-7 overflow-x-auto p-5 mx-auto w-[1377px] max-w-full">
    <!-- HEADER -->
    <h1 class="text-3xl font-extrabold pl-15 lg:pl-0">MÓVILES</h1>

    <!-- MOBILES TABLE -->
    <div class="overflow-x-auto">
      <table class="border-separate border-spacing-2">
        <thead>
          <tr>
            <th class="diagonal-th invisible" rowspan="4" style="position: relative">
              <span class="flex diagonal-th-left text-xs md:hidden">DEF.</span>
              <span class="diagonal-th-left text-xs hidden md:block">DEFENSA</span>
              <span class="flex diagonal-th-right text-xs text-[#101828] md:hidden">ATQ.</span>
              <span class="diagonal-th-right text-xs text-[#101828] hidden md:block">ATAQUE</span>
            </th>

            <th
              v-for="mobileHead in mobileHeads"
              :key="mobileHead.label"
              class="text-white px-8 py-2 text-xl head-cell2 !font-extrabold"
              :colspan="mobileHead.colspan"
            >
              {{ mobileHead.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <!-- ...celdas EXPLOSIVO... -->
          </tr>
          <tr v-for="mobileRow in mobileRows" :key="mobileRow.head">
            <th class="px-2 md:px-8 text-white text-xl head-cell !font-extrabold">
              <span class="md:hidden text-xs mt-1 font-bold text-center">{{ mobileRow.head }}</span>
              <span class="hidden md:block">
                {{ mobileRow.head }}
              </span>
            </th>
            <MobileGB
              v-for="mobile in mobileRow.mobiles"
              :key="mobile.label"
              :img="mobile.img"
              :label="mobile.label"
              :alt="mobile.alt"
              :colspan="mobile.colspan"
              :borderColor="mobile.borderColor"
              :clickable="mobile.clickable"
              :info="mobile.info"
              :secondColor="mobile.secondColor"
              v-model:selectedMobile="selectedMobile"
            />
          </tr>
        </tbody>
      </table>
    </div>

    <!-- {{ selectedMobileInfo?.img }} -->
    <div
      v-if="selectedMobileInfo"
      class="flex md:h-60 select-none rounded-xl gap-x-10 gap-y-6 p-5 items-center flex-col md:flex-row max-w-[400px] mx-auto md:mx-0 md:max-w-full selected-mobile-div"
      :style="{
        borderColor: selectedMobileInfo?.borderColor,
        borderWidth: '7px',
        borderStyle: 'solid',
        '--border-color': selectedMobileInfo?.borderColor,
      }"
    >
      <img
        class="w-40 md:w-55 scale-x-[-1]"
        :src="`/mobilesGB/${selectedMobileInfo?.img}.webp`"
        draggable="false"
      />
      <div class="flex flex-col gap-y-1 max-h-full">
        <h1 class="text-white text-4xl font-extrabold uppercase">
          {{ selectedMobileInfo?.label }}
        </h1>
        <p class="selected-info pr-1 overflow-y-auto max-w-[72ch] font-semibold">
          {{ selectedMobileInfo?.info }}
        </p>
      </div>
    </div>
  </div>
</template>

<style>
/* ARMOR */

th.head-cell {
  background: linear-gradient(to right, #232a36 30%, rgb(16, 24, 40) 100%);
  color: #fff;
  font-weight: bold;
  font-size: 1.25rem;
  letter-spacing: 2px;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px 0 #0004;
  border-right: 6px solid white;
  text-shadow: 0 2px 8px #0008;
}

th.head-cell2 {
  background: linear-gradient(to bottom, #232a36 30%, rgb(16, 24, 40) 100%);
  color: #fff;
  font-weight: bold;
  font-size: 1.25rem;
  letter-spacing: 2px;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px 0 #0004;
  border-bottom: 6px solid white;
  text-shadow: 0 2px 8px #0008;
}

.selected-mobile-div {
  background: linear-gradient(to top, rgb(16, 24, 40) 30%, var(--border-color));
}

@media (min-width: 768px) {
  .selected-mobile-div {
    background: linear-gradient(to left, rgb(16, 24, 40) 10%, var(--border-color));
  }
}

.diagonal-th {
  background: linear-gradient(13deg, #232a36 50%, #fcfcfc 50%);
  color: #fff;
  position: relative;
  font-weight: bold;
  font-size: 1.1rem;
  letter-spacing: 2px;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px 0 #0004;
  /* border-right: 6px solid white; */
  text-shadow: 0 2px 8px #0008;
  overflow: hidden;
  /* Ajusta según tu tabla */
}

.diagonal-th-left {
  position: absolute;
  left: 0;
  top: 0;
  width: 60%;
  height: 80%;
  /* display: flex; */
  align-items: flex-end;
  justify-content: center;
  padding-top: 12px;
  text-align: center;
}

.diagonal-th-right {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 80%;
  /* display: flex; */
  align-items: flex-start;
  justify-content: center;
  padding-bottom: 12px;
  text-align: center;
}
</style>
