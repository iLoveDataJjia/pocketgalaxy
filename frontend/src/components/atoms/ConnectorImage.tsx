import Image from "next/image";

export function ConnectorImage({
  type,
  size,
}: {
  type: "PostgreSQL" | "MySQL" | "MariaDB" | "MongoDB" | "MinIO";
  size: "sm" | "base";
}) {
  const { width, height, maxHeigthCSS } = (() => {
    switch (size) {
      case "base":
        return { width: 40, height: 40, maxHeigthCSS: "max-h-10" };
      case "sm":
        return { width: 36, height: 36, maxHeigthCSS: "max-h-9" };
    }
  })();
  return (
    <Image
      src={`/connectors/${type}.webp`}
      width={width}
      height={height}
      alt={type}
      className={`m-auto max-w-min ${maxHeigthCSS}`}
    />
  );
}
