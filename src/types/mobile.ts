export interface Mobile {
  label: string
  img: string
  alt: string
  colspan: number
  borderColor: string
  clickable: boolean
  info: string
}

export interface MobileRow {
  head: string
  mobiles: Mobile[]
}
