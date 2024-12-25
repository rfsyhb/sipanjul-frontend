import React from 'react';
import { useTable, useSortBy } from 'react-table';
import PropTypes from 'prop-types';

export default function FlexibleTable({ data, selectedData }) {
  // Map server data to table-friendly format
  const mappedData = React.useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }

    return data.map((item) => {
      const formattedDate = item.date
        ? new Date(item.date).toLocaleString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : '-';

      if (selectedData === 'perubahan') {
        return {
          komoditi: item.name || '-',
          stok_awal: null, // Not applicable for 'perubahan'
          stok_masuk: item.quantity > 0 ? item.quantity : 0,
          stok_keluar: item.quantity < 0 ? Math.abs(item.quantity) : 0,
          keterangan: item.description || '-',
          date: formattedDate,
        };
      }

      if (selectedData === 'penjualan') {
        return {
          komoditi: item.komoditi || '-',
          stok_awal: item.stockawal || 0,
          stok_terjual: item.terjual || 0,
          hasil_penjualan: item.hargapenjualan || 0,
          stok_akhir: item.stockakhir || 0,
          divisi: item.divisi || '-',
          date: formattedDate,
        };
      }

      return {};
    });
  }, [data, selectedData]);

  // Define table columns dynamically
  const columns = React.useMemo(() => {
    const baseColumns = [
      { Header: 'Komoditi', accessor: 'komoditi' },
      { Header: 'Tanggal', accessor: 'date' },
    ];

    if (selectedData === 'perubahan') {
      return [
        ...baseColumns,
        { Header: 'Stok Masuk', accessor: 'stok_masuk' },
        { Header: 'Stok Keluar', accessor: 'stok_keluar' },
        { Header: 'Keterangan', accessor: 'keterangan' },
      ];
    }

    if (selectedData === 'penjualan') {
      return [
        ...baseColumns,
        { Header: 'Stok Awal', accessor: 'stok_awal' },
        { Header: 'Stok Terjual', accessor: 'stok_terjual' },
        { Header: 'Hasil Penjualan', accessor: 'hasil_penjualan' },
        { Header: 'Stok Akhir', accessor: 'stok_akhir' },
        { Header: 'Divisi', accessor: 'divisi' },
      ];
    }

    return baseColumns;
  }, [selectedData]);

  // Using React Table for table structure
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: mappedData }, useSortBy);

  if (mappedData.length === 0) {
    return <p className="text-center">No data available</p>;
  }

  return (
    <table
      {...getTableProps()}
      className="w-full border border-black border-collapse"
    >
      <thead className="border border-black">
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            key={headerGroup.id}
            className="border border-black"
          >
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                key={column.id}
                className="border border-black p-2"
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="border border-black">
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              key={row.id}
              className="border border-black"
            >
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  key={cell.column.id}
                  className="border border-black p-2"
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

FlexibleTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedData: PropTypes.string.isRequired,
};
