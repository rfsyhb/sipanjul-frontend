import React from 'react';
import { useTable, useSortBy } from 'react-table';
import PropTypes from 'prop-types';

export default function FlexibleTable({ data, selectedData }) {
  // Jika tidak ada data, tidak perlu menampilkan tabel sama sekali
  if (!data || data.length === 0) {
    return null;
  }

  // Definisikan kolom tabel secara dinamis
  const columns = React.useMemo(() => {
    let columnsArray = [
      { Header: 'Komoditi', accessor: 'komoditi' },
      { Header: 'Divisi', accessor: 'divisi' },
      { Header: 'Stok Awal', accessor: 'stok_awal' },
      { Header: 'Stok Terjual', accessor: 'stok_terjual' },
      { Header: 'Hasil Penjualan', accessor: 'hasil_penjualan' },
      { Header: 'Stok Akhir', accessor: 'stok_akhir' },
    ];

    if (selectedData === 'perubahan') {
      columnsArray.splice(3, 0, {
        Header: 'Stok Masuk',
        accessor: 'stok_masuk',
      });
      columnsArray.splice(4, 0, {
        Header: 'Stok Keluar',
        accessor: 'stok_keluar',
      });
      columnsArray.push({ Header: 'Keterangan', accessor: 'keterangan' });
    }

    return columnsArray;
  }, [selectedData]);

  // Menggunakan React Table untuk mengatur tabel dan sorting
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

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
