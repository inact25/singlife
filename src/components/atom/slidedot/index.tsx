type Props = {
  indexActive: number
  position?: 'start' | 'center' | 'end'
}
const Index = ({ indexActive, position = 'start' }: Props) => {
  return (
    <div
      className={`flex gap-1 ${position === 'start' ? 'justify-start' : position === 'center' ? 'justify-center' : 'justify-end'}`}
    >
      <div
        className={`rounded-full ${indexActive === 0 ? 'w-[16px] bg-singlife-purple-800' : 'w-[8px] bg-singlife-purple-200'} h-[8px]`}
      />
      <div
        className={`rounded-full ${indexActive === 1 ? 'w-[16px] bg-singlife-purple-800' : 'w-[8px] bg-singlife-purple-200'} h-[8px]`}
      />
      <div
        className={`rounded-full ${indexActive === 2 ? 'w-[16px] bg-singlife-purple-800' : 'w-[8px] bg-singlife-purple-200'} h-[8px]`}
      />
    </div>
  )
}

export default Index
