import { useQuery } from '@tanstack/react-query';
import useIsMobile from '../../hooks/useIsMobile';
import { recentTransactionList } from '../../utils/dummyData';
import api from '../../utils/api/api';

export default function RecentTransaction() {
  const isMobile = useIsMobile(768);
  const {
    data: recentTransactions = [],
    isLoading: isRecentTransactionLoading,
    isError: isRecentTransactionError,
    isRefetching: isRecentTransactionRefetching,
  } = useQuery({
    queryKey: ['recentTransactions'],
    queryFn: api.oprGetRecentTransaction,
  });

  return (
    <section className="bg-white p-4 rounded-2xl shadow-md flex-grow max-w-[92vw] lg:max-w-none flex flex-col min-h-0">
      <h2 className="text-base lg:text-lg font-medium pb-1 lg:pb-2 flex-shrink-0">
        Transaksi Terbaru
      </h2>
      {/* Scrolling Container */}
      <div className="overflow-x-auto overflow-y-auto flex-grow max-h-auto">
        {(isRecentTransactionLoading || isRecentTransactionRefetching) && <p>Loading...</p>}
        {!isRecentTransactionLoading && !isRecentTransactionError && !isRecentTransactionRefetching && (
          <table className="min-w-full table-auto border-collapse">
            <thead className="sticky top-0 bg-white">
              <tr>
                <th className="border-b px-4 text-left">
                  {isMobile ? 'Nama' : 'Nama Produk'}
                </th>
                <th className="border-b px-4 text-left">
                  {isMobile ? 'Qty' : 'Kuantitas'}
                </th>
                <th className="border-b px-4 text-left">Total</th>
                <th className="border-b px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border-b px-4 py-2 lg:text-base text-xs">
                    {item.name}
                  </td>
                  <td className="border-b px-4 py-2 lg:text-base text-xs">
                    {item.quantity}
                  </td>
                  <td className="border-b px-4 py-2 lg:text-base text-xs">
                    Rp {item.total.toLocaleString()}
                  </td>
                  <td className="border-b px-4 py-2 lg:text-base text-xs">
                    {new Date(item.date).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}{' '}
                    {new Date(item.date).toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
