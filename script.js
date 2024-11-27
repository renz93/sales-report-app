document.addEventListener("DOMContentLoaded", () => {
  // Fungsi untuk memuat sidebar
  function loadSidebar() {
    const sidebarPath = "sidebar.html";
    console.log(`Fetching sidebar from: ${sidebarPath}`);

    const sidebarElement = document.getElementById("sidebar-placeholder");
    if (!sidebarElement) {
      console.error("Element #sidebar-placeholder tidak ditemukan di halaman.");
      return;
    }

    fetch(sidebarPath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        sidebarElement.innerHTML = data;
        console.log("Sidebar loaded successfully.");
      })
      .catch(error => {
        console.error("Error loading sidebar:", error);
        sidebarElement.innerHTML = `
          <p style="color: red;">Sidebar gagal dimuat. Pastikan server lokal berjalan.</p>
        `;
      });
  }

  // Fungsi untuk membuat grafik
  function createChart(canvasId, config) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.warn(`Canvas dengan ID "${canvasId}" tidak ditemukan.`);
      return;
    }
    const ctx = canvas.getContext('2d');
    new Chart(ctx, config);
  }

  // Grafik: Rata-rata Omzet per Bulan
  createChart('omzetChart', {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Omzet (Juta)',
        data: [100, 150, 200, 180, 210, 250, 220, 300, 270, 320, 340, 360],
        borderColor: '#36A2EB',
        fill: false,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        }
      }
    }
  });

  // Grafik: Mesin/Device Paling Laku
  createChart('deviceChart', {
    type: 'bar',
    data: {
      labels: ['Mesin A', 'Mesin B', 'Mesin C', 'Mesin D'],
      datasets: [{
        label: 'Jumlah Terjual',
        data: [50, 70, 30, 90],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        }
      }
    }
  });

  // Grafik: Perbandingan Penjualan Bulan Ini dan Bulan Lalu
  createChart('comparisonChart', {
    type: 'bar',
    data: {
      labels: ['Bulan Ini', 'Bulan Lalu'],
      datasets: [{
        label: 'Penjualan (Juta)',
        data: [300, 250],
        backgroundColor: ['#4BC0C0', '#FF6384'],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        }
      }
    }
  });

  // Grafik: Client yang Sering Order
  createChart('clientChart', {
    type: 'pie',
    data: {
      labels: ['Client A', 'Client B', 'Client C', 'Client D'],
      datasets: [{
        data: [40, 30, 20, 10],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        }
      }
    }
  });

  // Fungsi untuk mengelola tema
  function handleThemeChange() {
    const themeSelect = document.getElementById('theme');
    if (themeSelect) {
      themeSelect.addEventListener('change', (e) => {
        const selectedTheme = e.target.value;
        document.body.className = selectedTheme; // Ganti kelas tema
        alert(`Tema diubah ke: ${selectedTheme}`);
      });
    } else {
      console.warn("Element #theme tidak ditemukan.");
    }
  }

  // Memuat sidebar
  loadSidebar();

  // Mengelola tema (jika ada)
  handleThemeChange();
});
