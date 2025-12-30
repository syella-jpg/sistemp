export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h1>POS Akupunktur</h1>

      <h3>Form Booking</h3>

      <input placeholder="Nama" /><br /><br />
      <input type="number" placeholder="Umur" /><br /><br />
      <textarea placeholder="Detail Penyakit"></textarea><br /><br />

      <select>
        <option>Pilih Penyakit</option>
        <option>Sakit Pinggang</option>
        <option>Migrain</option>
      </select><br /><br />

      <input type="number" placeholder="Jumlah Orang" /><br /><br />
      <input type="date" /><br /><br />
      <input type="time" /><br /><br />

      <button>Simpan Booking</button>
    </main>
  );
}
