import {Image as NextImage} from 'next/image';

export default function Image(props) {
  return (
    <NextImage
      {...props}
      sizes={props.sizes ||
        '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
      fill
      quality={85}
    />
  );
}