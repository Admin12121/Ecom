import { getPlaiceholder } from "plaiceholder";

export async function getImage(src: string) {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );
  const {
    metadata: { height, width },
    ...placeholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...placeholder,
    img: { src, height, width },
  };
}
