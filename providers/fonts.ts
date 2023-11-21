import { Inter, Open_Sans, Roboto, Source_Sans_3 } from 'next/font/google'
export const inter = Inter({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})
export const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const open_sans = Open_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
export const source_sans = Source_Sans_3({
  weight: ['200', '300', '400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
