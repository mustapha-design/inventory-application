import { QRCodeSVG } from 'qrcode.react';
export default function ViewProduct({viewProduct, setViewProduct, handleDelete}) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 flex flex-col items-center">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Product Details</h2>

            <p className="mb-2 text-gray-600">
              <strong>Name:</strong> {viewProduct.itemName}
            </p>

            <p className="mb-2 text-gray-600">
              <strong>Quantity:</strong> {viewProduct.quantity}
            </p>

            <p className="mb-4 text-gray-600">
              <strong>Category:</strong> {viewProduct.category}
            </p>

            {/* QR Code */}
            <div className="mb-4">
              <QRCodeSVG
                value={JSON.stringify({
                  name: viewProduct.itemName,
                  quantity: viewProduct.quantity,
                  category: viewProduct.category,
                })}
                size={150}
                includeMargin={true}
              />
            </div>

            <div className="flex justify-between w-full">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setViewProduct(null)}
              >
                Cancel
              </button>

              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  handleDelete(viewProduct.id);
                  setViewProduct(null);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
    );
}