let mahasiswa = [];
let currentPage = 1;
let pageSize = 10;

function tambahData() {
  const nim = document.getElementById("nim").value;
  const nama = document.getElementById("nama").value;
  const alamat = document.getElementById("alamat").value;

  if (nim && nama && alamat) {
    mahasiswa.push({ nim, nama, alamat });
    renderTable();
    resetForm();
    Swal.fire({
      title: "Success",
      text: "Berhasil menambahkan data baru.",
      icon: "success"
    });
  } else {
    Swal.fire({
      title: "Warning",
      text: "Tidak dapat menambahkan data karena data tidak lengkap.",
      icon: "warning"
    });
  }
}

function resetForm() {
  document.getElementById("nim").value = "";
  document.getElementById("nama").value = "";
  document.getElementById("alamat").value = "";
}

function renderTable() {
  const tableBody = document.querySelector("#mahasiswaTable tbody");
  tableBody.innerHTML = "";

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedMahasiswa = mahasiswa.slice(start, end);

  paginatedMahasiswa.forEach((mhs, index) => {
    const row = `<tr>
      <td>${mhs.nim}</td>
      <td>${mhs.nama}</td>
      <td>${mhs.alamat}</td>
      <td class="edit-hapus">
        <div class="edit-hapus-posisi">
      <button id="edit-data" onclick="openEditModal(${
            start + index
          })"><svg height="1em" viewBox="0 0 512 512">
          <path
            d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c-14.1-4.2-27-11.8-37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
          ></path>
        </svg></button>
          
        <button id="hapus-data" onclick="hapusData(${
            start + index
          })"><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 69 14"
          class="svgIcon bin-top"
        >
          <g clip-path="url(#clip0_35_24)">
            <path
              fill="black"
              d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
            ></path>
          </g>
          <defs>
            <clipPath id="clip0_35_24">
              <rect fill="white" height="14" width="69"></rect>
            </clipPath>
          </defs>
        </svg>
      
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 69 57"
          class="svgIcon bin-bottom"
        >
          <g clip-path="url(#clip0_35_22)">
            <path
              fill="black"
              d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
            ></path>
          </g>
          <defs>
            <clipPath id="clip0_35_22">
              <rect fill="white" height="57" width="69"></rect>
            </clipPath>
          </defs>
        </svg></button>
          </div>
      </td>
      </div>
  </tr>`;
    tableBody.innerHTML += row;
  });

  document.getElementById("totalMahasiswa").textContent = mahasiswa.length;
}

function openEditModal(index) {
  const selectedMhs = mahasiswa[index];
  document.getElementById("editNama").value = selectedMhs.nama;
  document.getElementById("editAlamat").value = selectedMhs.alamat;
  document.getElementById("editModal").style.display = "block";
  document.getElementById("editModal").dataset.index = index;
}

function saveEdit() {
  const index = document.getElementById("editModal").dataset.index;
  const nama = document.getElementById("editNama").value;
  const alamat = document.getElementById("editAlamat").value;

  if (nama && alamat) {
    mahasiswa[index].nama = nama;
    mahasiswa[index].alamat = alamat;
    renderTable();
    closeModal();
    Swal.fire({
      title: "Updated",
      text: "Berhasil melakukan update data.",
      icon: "success"
    });
  } else {
    Swal.fire({
      title: "Error",
      text: "Tidak dapat mengupdate data karena data tidak lengkap.",
      icon: "error"
    });
  }
}

function closeModal() {
  document.getElementById("editModal").style.display = "none";
}

function hapusData(index) {
  Swal.fire({
    title: 'Yakin untuk menghapus data?',
    text: 'Data yang dihapus tidak dapat dikembalikan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      mahasiswa.splice(index, 1);
      renderTable();
      Swal.fire(
        'Deleted!',
        'Data berhasil dihapus.',
        'success'
      );
    }
  });
}



function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
}

function nextPage() {
  const maxPage = Math.ceil(mahasiswa.length / pageSize);
  if (currentPage < maxPage) {
    currentPage++;
    renderTable();
  }
}

function changePageSize(size) {
  pageSize = size;
  renderTable();
}

function cariData() {
  const searchNIM = document.getElementById("searchNIM").value;
  if (searchNIM === "") {
    renderTable();
  } else {
    const result = mahasiswa.filter((mhs) => mhs.nim.includes(searchNIM));
    if (result.length > 0) {
      renderSearchResult(result);
    } else {
      showFeedback("error", "Mahasiswa dengan NIM tersebut tidak ditemukan.");
    }
  }
}

function resetSearch() {
  document.getElementById("searchNIM").value = "";
  document.getElementById("searchNama").value = "";
  renderTable();
}

function cariNama() {
  const searchNama = document.getElementById("searchNama").value.toLowerCase();
  if (searchNama === "") {
    renderTable();
  } else {
    const result = mahasiswa.filter((mhs) =>
      mhs.nama.toLowerCase().includes(searchNama)
    );
    if (result.length > 0) {
      renderSearchResult(result);
    } else {
      showFeedback("error", "Mahasiswa dengan Nama tersebut tidak ditemukan.");
    }
  }
}

function renderSearchResult(result) {
  const tableBody = document.querySelector("#mahasiswaTable tbody");
  tableBody.innerHTML = "";

  result.forEach((mhs) => {
    const row = `<tr>
        <td>${mhs.nim}</td>
        <td>${mhs.nama}</td>
        <td>${mhs.alamat}</td>
        <td class="actions"> <!-- Kolom untuk tombol "Edit" dan "Hapus" -->
          <div class="edit-hapus-posisi"> <!-- Menggunakan gaya CSS yang telah didefinisikan -->
            <button class="edit-data" onclick="openEditModal(${mahasiswa.findIndex(
              (item) => item.nim === mhs.nim
            )})">Edit</button>
            <button class="hapus-data" onclick="hapusData(${mahasiswa.findIndex(
              (item) => item.nim === mhs.nim
            )})">Hapus</button>
          </div>
        </td>
      </tr>`;
    tableBody.innerHTML += row;
  });

  document.getElementById("totalMahasiswa").textContent = result.length;
}

// ini bagian buat waktu 

function updateClock() {
  var now = new Date();

  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();

  var hourDegree = (hour % 12) * 30 + minute / 2;
  var minuteDegree = minute * 6 + second / 10;
  var secondDegree = second * 6;

  document.getElementById('hour').style.transform = `rotateZ(${hourDegree}deg)`;
  document.getElementById('minute').style.transform = `rotateZ(${minuteDegree}deg)`;
  document.getElementById('second').style.transform = `rotateZ(${secondDegree}deg)`;

  document.getElementById('date').getElementsByTagName('span')[1].innerText = now.toDateString(); // Update tanggal
  document.getElementById('digital-clock').innerText = now.toLocaleTimeString();

  var quoteElement = document.getElementById("quoteText");
  var imageContainer = document.getElementById("imageContainer"); 

  var hours = hour; // Menetapkan nilai hours ke hour saat ini

  var quote = "";
  var imageSrc = "";

  if (hours >= 6 && hours < 10) {
    quote = "Pagi Kawan. Adanya matahari yang membuat pagi. Pagi yang cerah untuk melanjutkan jalan hidup. Pagi membuat semua orang belajar";
    imageSrc = "foto/pagi.png";
  } else if (hours >= 10 && hours < 15) {
    quote = "Siang Kawan. Siaang yang menjadikan pusatnya terletak di Matahari. Siang panggilan kata untuk orang yang kita cintai ";
    imageSrc = "foto/siangz.jpg";
  } else if (hours >= 16 && hours < 18) {
    quote = "Sore Kawan. Sore yang membuat semua orang untuk beristirahat dari dunianya. Keindahan sore terletak di senja. Senja sore yang membuat orang berkata 'the sunset is it beautiful right??' ";
    imageSrc = "foto/nyore.jpg";
  } else if (hours >= 18 && hours < 22) {
    quote = "Tengah Malam Kawan. Malam yang penuh dengan ketenangan namun juga bisa dengan ketakukatan. Malam yang kesepian, hanya ada bulan dan bintang diantaranya.";
    imageSrc = "foto/malam.jpg";
  } else {
    quote = "Malam Kawan. Malam yang sudah tertidur untuk menunggu matahari. Malam yang sabar, menunggu matahari datang namun tak pernah bertemu.";
    imageSrc = "foto/malambanget.webp";
  }

  quoteElement.textContent = quote;
  imageContainer.innerHTML = "<img src='" + imageSrc + "' />";
}

updateClock();
setInterval(updateClock, 1000);

