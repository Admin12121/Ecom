// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { generateBlurData } from '@/lib/get-blurData';

// interface BlurImageProps {
//   src: string;
//   alt: string;
//   width: number;
//   height: number;
//   className?: string;
// }

// const BlurImage: React.FC<BlurImageProps> = ({
//   src,
//   alt,
//   width,
//   height,
//   className,
//   ...props
// }) => {
//   const [blurData, setBlurData] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchBlurData = async () => {
//       try {
//         const blur = await generateBlurData(src);
//         setBlurData(blur);
//       } catch (error) {
//         console.error('Error generating blurDataURL:', error);
//         setBlurData(''); // Fallback to no blur
//       }
//     };

//     fetchBlurData();
//   }, [src]);
//    console.log(blurData)
//   if (!blurData) {
//     return (
//       <div
//         style={{
//           width: width,
//           height: height,
//           backgroundColor: '#E8E8E8',
//         }}
//       ></div>
//     );
//   }

//   return (
//     <Image
//       src={src}
//       alt={alt}
//       width={width}
//       height={height}
//       placeholder="blur"
//       blurDataURL={blurData}
//       className={className}
//       {...props}
//     />
//   );
// };

// export default BlurImage;
