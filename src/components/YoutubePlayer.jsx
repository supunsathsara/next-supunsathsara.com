'use client'

import YouTube from 'react-youtube'

const YoutubePlayer = () => {
  return (
    <div className='relative mx-4 rounded-xl aspect-video md:mx-auto max-w-4xl mt-8 mb-8 bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl lg:p-4'>
      <YouTube
        videoId='qCDPhRVrhZY'
        className='relative w-full aspect-video overflow-hidden rounded-xl' // defaults -> ''
        iframeClassName='absolute inset-0 w-full h-full'
        opts={{autoplay: 0, controls: 0}}
      />
    </div>
  )
}

export default YoutubePlayer