import { useState, useEffect } from 'react';
import { Box, Image, Spinner, SpinnerProps } from '@chakra-ui/react';
import PlaceholdImage from '../../assets/2400x1900.svg'

interface AsyncImageProps {
  src?: string;
  alt: string;
  spinnerProps?: SpinnerProps; 
  [key: string]: any;
}

const AsyncImage: React.FC<AsyncImageProps> = ({ src, alt, spinnerProps, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (src) {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setLoading(false);
      };
    }
  }, [src]);

  return (
    <Box position="relative" {...props}>
      {loading && src ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Spinner size="xl" {...spinnerProps} />
        </Box>
      ) : imageSrc ? (
        <Image src={imageSrc} alt={alt} loading="lazy" {...props} />
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" w="100%" height="100%">
          <Image src={PlaceholdImage.src} alt={alt} loading="lazy" {...props} />
        </Box>
      )}
    </Box>
  );
};

export default AsyncImage;
