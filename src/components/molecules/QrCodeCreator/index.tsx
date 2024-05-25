import QRCode from 'react-qr-code'

type Props = {
  value: string
}

const QrCodeCreator = ({ value }: Props) => {
  return (
    <QRCode
        style={{boxShadow: 'rgba(255, 0, 8, 0.2) 0px 7px 29px 0px'}}
        className='h-[165px] w-[165px] p-5 bg-white rounded-xl shadow-singlife-red-800'
        fgColor='black'
        bgColor='white'
      value={value}
    />
  )
}

export default QrCodeCreator
