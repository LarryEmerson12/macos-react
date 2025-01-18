import React from 'react';

// Define the type for the `images` object
type Images = {
  [key: number]: string; // Keys are numbers, values are strings (image names)
};

export default function Dock() {
  // Define the `images` object with type annotation
  const images: Images = {
    0: "finder",
    1: "safari",
    2: "xcode",
    3: "terminal",
    4: "apple-music",
    5: "system-preferences",
  };

  return (
    <div className="w-[40ch] h-[7ch] bg-white/45 rounded-2xl flex justify-around items-center backdrop-blur-lg">
      {Object.keys(images).map((key) => {
        // Convert the key to a number (Object.keys returns strings)
        const index = Number(key);
        return (
          <img
            key={index}
            src={`/${images[index]}.png`} // Use the image name from the `images` object
            width={55}
            height={55}
            alt={images[index]} // Add alt text for accessibility
          />
        );
      })}
    </div>
  );
}