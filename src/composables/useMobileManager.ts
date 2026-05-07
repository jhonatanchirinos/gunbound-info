import { ref, computed } from 'vue'
import movilesData from '@/data/moviles.json'
import type { MobileRow } from '@/types/mobile'

export function useMobileManager() {
  const mobileHeads = [
    {
      label: 'MECÁNICO',
      colspan: 6,
    },
    { label: 'ESCUDO', colspan: 6 },
    { label: 'BIÓNICO', colspan: 12 },
  ]

  const mobileRows = ref<MobileRow[]>(movilesData)

  const selectedMobile = ref<string | null>(null)

  const selectedMobileInfo = computed(() => {
    const result = mobileRows.value
      .flatMap((row) => row.mobiles)
      .find((mobile) => mobile.label === selectedMobile.value)

    return result
  })

  return {
    mobileHeads,
    mobileRows,
    selectedMobile,
    selectedMobileInfo,
  }
}
