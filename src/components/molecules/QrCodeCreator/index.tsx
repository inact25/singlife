import QRCode from 'react-qr-code'

type Props = {
  value: string
}

const QrCodeCreator = ({ value }: Props) => {
  return (
    <QRCode
      className='rounded-md'
      fgColor='#FF0000'
      bgColor='#ffe9ec'
      value={value}
    />
  )
}

export default QrCodeCreator
