import React ,{ useState } from 'react'

const ImageWithLoader = ({ src, alt, className, loaderClass}) => {
    const [loading, setLoading] = useState(true);
  return (
    <div className={`relative ${className} z-0`}>
        {loading && (
        <div className={`absolute inset-0 bg-gray-300 animate-pulse text-center${loaderClass}`} ><span className='w-full h-full flex justify-center items-center'>loading...</span></div>
      )}

      <img src={src} alt={alt} className={`w-full h-full object-cover transition-all duration-500 ${loading? "opacity-0" : "opacity-100"}`}
      onLoad={()=>setLoading(false)}
      onError={()=>setLoading(false)}
      />

      
    </div>
  )
}

export default ImageWithLoader
