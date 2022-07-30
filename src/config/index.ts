interface NavItem {
  label: string
  path?: string
  children?: NavItem[]
}

export const MAIN_NAV: Array<NavItem> = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Articles',
    path: '/articles',
  },
  {
    label: 'About Us',
    path: '/about-us',
  },
]
