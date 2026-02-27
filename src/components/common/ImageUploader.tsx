import React from 'react';
import { CloudUpload, X, Plus } from 'lucide-react';

interface ImageUploaderProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  mainImageIndex: number;
  setMainImageIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, setImages, mainImageIndex, setMainImageIndex }) => {
  // In a real app, this would handle actual file selection
  const handleUploadClick = () => {
    const dummyImage =
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=300&h=300';
    setImages([...images, dummyImage]);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const newImages = images.filter((_, idx) => idx !== indexToRemove);
    setImages(newImages);
    if (mainImageIndex === indexToRemove) {
      setMainImageIndex(0); // Reset main to first if current main is deleted
    } else if (mainImageIndex > indexToRemove) {
      setMainImageIndex(mainImageIndex - 1); // Adjust index
    }
  };

  return (
    <section className="flex flex-col gap-6 rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-stone-100">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-stone-900">Visuals</h2>
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-600">
          Draft
        </span>
      </div>

      {/* Primary Upload Box */}
      <div
        onClick={handleUploadClick}
        className="group relative flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-stone-200 bg-stone-50 transition-colors hover:border-[#ef9d2a] hover:bg-[#ef9d2a]/5"
      >
        <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-stone-100 group-hover:scale-110 transition-transform">
          <CloudUpload className="text-[#ef9d2a] w-10 h-10" strokeWidth={1.5} />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-sm font-bold text-stone-900 group-hover:text-[#ef9d2a] transition-colors">
            Click to upload
          </p>
          <p className="text-xs text-stone-500 font-medium">SVG, PNG, JPG or GIF (max. 5MB)</p>
        </div>
      </div>

      {/* Gallery Thumbnails */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setMainImageIndex(idx)}
              className={`relative aspect-square cursor-pointer overflow-hidden rounded-2xl group ${mainImageIndex === idx
                  ? 'ring-2 ring-[#ef9d2a] ring-offset-2'
                  : 'opacity-70 hover:opacity-100 border border-stone-200'
                }`}
            >
              <img src={img} alt={`Upload ${idx}`} className="h-full w-full object-cover" />
              {/* Remove Overlay */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage(idx);
                }}
                className="absolute inset-0 bg-stone-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-5 h-5 text-white" />
              </div>
            </div>
          ))}
          {images.length < 4 && (
            <div
              onClick={handleUploadClick}
              className="flex aspect-square cursor-pointer items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 text-stone-400 hover:border-[#ef9d2a] hover:text-[#ef9d2a] transition-colors"
            >
              <Plus className="w-6 h-6" />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ImageUploader;
