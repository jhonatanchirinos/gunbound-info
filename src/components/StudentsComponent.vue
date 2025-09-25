<script setup lang="ts">
import { ref } from 'vue'

// 3. Contar alumnos aprobados
const students = [
  { name: 'Carlos', grade: 15 },
  { name: 'Elena', grade: 10 },
  { name: 'Lucía', grade: 12 },
]

const approvedStudents = students.filter((a) => a.grade >= 11)

const isApprovedStudentsVisible = ref(false)

const showApprovedStudents = () => {
  isApprovedStudentsVisible.value = true
}
</script>

<template>
  <!-- 3. Contar alumnos aprobados -->
  <section>
    <h2>3. Alumnos aprobados</h2>
    <button @click="showApprovedStudents">Mostrar aprobados</button>
    <ul v-if="isApprovedStudentsVisible">
      <p>Aprobaron {{ approvedStudents.length }} alumnos:</p>
      <li v-for="student in approvedStudents" :key="student.name">
        {{ student.name }} (Nota: {{ student.grade }})
      </li>
    </ul>
  </section>
</template>
