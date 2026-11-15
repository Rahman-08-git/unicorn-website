/* One photograph from src/data/photos.js, responsive and lazy unless it is above the fold. */
export default function Photo({ photo, sizes = '(max-width: 1023px) 100vw, 50vw', eager = false, className = 'frame__img', ...rest }) {
  return (
    <img
      className={className}
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={photo.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      data-source="stand-in"
      data-subject={photo.subject}
      {...rest}
    />
  )
}
