// const baseUrl =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:3000/'
//     : process.env.NEXT_PUBLIC_DOMAIN;

// export async function dynamicBlurDataUrl(url) {
//   // * generate the samallest image => convert to Base64. w=16&amp;q=75
//   /**
//    * Can see what is the smallest image 'w=**&amp;q=**' by inspecting the image
//    * Can't see it right away by just inspecting. In the inspect window, right click
//    * on the specific image, then select 'Edit as HTML' option.
//    * there you can see something like this:
//    * srcset="/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdn2htlate%2Fimage%2Fupload%2Fv1660537250%2Fcld-sample.jpg&amp;w=16&amp;q=75 16w,
//    * /_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdn2htlate%2Fimage%2Fupload%2Fv1660537250%2Fcld-sample.jpg&amp;w=32&amp;q=75 32w,
//    * /_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdn2htlate%2Fimage%2Fupload%2Fv1660537250%2Fcld-sample.jpg&amp;w=48&amp;q=75 48w,
//    * /_next/image?......
//    * you can see the smallest image is w=16&amp;q=75 here
//    */
//   const base64str = await fetch(
//     `${baseUrl}/_next/image?url=${url}&w=16&q=75` //* Use smallest image w and q here
//   ).then(async (res) =>
//     Buffer.from(await res.arrayBuffer()).toString('base64')
//   );

//   const blurSvg = `
//     <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
//       <filter id='b' color-interpolation-filters='sRGB'>
//         <feGaussianBlur stdDeviation='1' />
//       </filter>

//       <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' 
//       href='data:image/avif;base64,${base64str}' />
//     </svg>
//   `;

//   const toBase64 = (str) =>
//     typeof window === 'undefined'
//       ? Buffer.from(str).toString('base64')
//       : window.btoa(str);

//   return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
// }
