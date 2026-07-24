export default function Gallery({ images }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {images.map((image, index) => (
        <img
          key={`${image}-${index}`}
          src={image}
          alt={`Gallery ${index + 1}`}
          className="h-64 w-full rounded-[24px] object-cover shadow-sm"
        />
      ))}
    </div>
  )
}
