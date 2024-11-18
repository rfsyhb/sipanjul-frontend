import { useState } from 'react';
import FlexibleForm from '../components/reportpage/FlexibleForm';

export default function ReportPage() {
  const [formData, setFormData] = useState(null);

  // Fungsi yang diteruskan ke FlexibleForm untuk menerima data
  const handleFormSearch = (data) => {
    setFormData(data);
    // Di sini, kamu juga bisa memanggil API atau memproses data lebih lanjut
    console.log('Data diterima dari FlexibleForm:', data);
  };

  return (
    <div className="p-4">
      <FlexibleForm onSearch={handleFormSearch} />

      {/* Jika ada data yang sudah diambil, tampilkan tabel */}
      {formData && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">Hasil Laporan</h3>
          <table className="w-full border border-black">
            <thead>
              <tr>
                <th className="border border-black p-2">Periode</th>
                <th className="border border-black p-2">Divisi</th>
                <th className="border border-black p-2">Data</th>
                {
                  /* Tampilkan kolom informasi jika data yang dipilih adalah 'detail' */
                  formData.data === 'detail' && (
                    <th className="border border-black p-2">Informasi</th>
                  )
                }
                {
                  /* Tampilkan kolom detail jika informasi yang dipilih adalah 'perubahan' */
                  formData.information === 'perubahan' && (
                    <th className="border border-black p-2">Detail</th>
                  )
                }
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2">{formData.period}</td>
                <td className="border border-black p-2">{formData.division}</td>
                <td className="border border-black p-2">{formData.data}</td>
                {
                  /* Tampilkan informasi jika data yang dipilih adalah 'detail' */
                  formData.data === 'detail' && (
                    <td className="border border-black p-2">
                      {formData.information}
                    </td>
                  )
                }
                {
                  /* Tampilkan detail jika informasi yang dipilih adalah 'perubahan' */
                  formData.information === 'perubahan' && (
                    <td className="border border-black p-2">
                      {formData.detail}
                    </td>
                  )
                }
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
