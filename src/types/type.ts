export interface FooterItem {
    title: string
    items: {
      title: string
      href: string
      external?: boolean
    }[]
  }