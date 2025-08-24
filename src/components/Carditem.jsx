export default function CardItem({ products, onDelete, onEdit }) {
  return (
   
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {products.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border h-full flex flex-col border-0">
           
            <div className="h-48 bg-gray-100 flex items-center justify-center rounded-t-lg overflow-hidden">
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="cardimg " />
            </div>

           
            <div className="p-4 flex-1 flex flex-col">
              <p className="text-xs text-gray-500 mb-1">{item.category}</p>
              <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-3 flex-1 line-clamp-3 leading-normal">{item.description}</p>

              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-green-600 text-lg">${item.price}</p>
                {item.rating && (
                  <div className="flex items-center text-sm">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1 text-gray-600">
                      {item.rating.rate} ({item.rating.count})
                    </span>
                  </div>
                )}
              </div>

              <div className="flex justify-between gap-2">
                <button
                  className="flex-1 bg-transparent hover:bg-gray-50 text-gray-600 px-3 py-2 rounded border border-gray-300 text-sm transition-colors flex items-center justify-center gap-1"
                  onClick={() => onEdit(item)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition-colors flex items-center justify-center gap-1"
                  onClick={() => onDelete(item.id)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
   
  )
}
