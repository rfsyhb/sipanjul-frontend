import { recentTransactionList } from "../../utils/dummyData";

export default function RecentTransaction() {
  return (
    <section className="bg-white p-4 rounded-2xl shadow-md ">
      <h2 className="text-lg font-medium pb-2">Transaksi Terbaru</h2>
      <div className="overflow-x-auto max-h-[24vh]">
        <table className="min-w-full table-auto border-collapse">
          <thead className="sticky top-0 bg-white">
            <tr>
              <th className="border-b px-4 text-left">Nama Produk</th>
              <th className="border-b px-4 text-left">Kuantitas</th>
              <th className="border-b px-4 text-left">Total</th>
              <th className="border-b px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactionList.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border-b px-4 py-2">{item.name}</td>
                <td className="border-b px-4 py-2">{item.qty}</td>
                <td className="border-b px-4 py-2">
                  Rp {item.total.toLocaleString()}
                </td>
                <td className="border-b px-4 py-2">
                  {new Date(item.datetime).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}{' '}
                  {new Date(item.datetime).toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}