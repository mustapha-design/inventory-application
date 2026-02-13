'use client';

import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';

export default function Page() {
  const product = {
    name: 'rice',
    price: 2000,
    category: 'food',
  }
  const qrCodeValue = JSON.stringify(product)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">
        Scan to check my github code
      </h1>

      <div className="bg-white p-4 rounded shadow">
        <QRCodeSVG value={qrCodeValue} size={200} includeMargin={true} />
      </div>

      {/* <p className="mt-4 text-gray-600">{product}</p> */}
    </div>
  );
}

