import l360 from '@assets/svgs/l360.svg'

const Index = () => {
  return (
    <div className='rounded-2xl flex justify-center items-center px-5 py-10 bg-white/40 backdrop-blur-md'>
      <div className='w-full'>
        <div className='mb-5'>
          <img
            className='m-auto'
            width={88}
            height={88}
            src={l360}
            alt='l360'
          />
        </div>
        <div>
          <p className='note'>Look around to explore</p>
        </div>
      </div>
    </div>
  )
}

export default Index
