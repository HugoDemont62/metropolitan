import NextImage from 'next/image'

export default function Image(props) {
  return (
    <NextImage
      {...props}
      quality={85}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      fill
    />
  )
}