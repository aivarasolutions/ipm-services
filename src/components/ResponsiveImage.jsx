const ResponsiveImage = ({ image, variant = 'main', ...imgProps }) => {
  if (!image) return null;

  const source = image[variant] || image;
  const { src, srcSet, webpSrcSet, avifSrcSet, sizes, width, height } = source;

  if (!srcSet) {
    return <img src={src} width={width} height={height} {...imgProps} />;
  }

  return (
    <picture style={{ display: 'block' }}>
      {avifSrcSet && <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />}
      {webpSrcSet && <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />}
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        width={width}
        height={height}
        {...imgProps}
      />
    </picture>
  );
};

export default ResponsiveImage;