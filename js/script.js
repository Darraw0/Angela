
/* INTERAKSI PORTOFOLIO */

// Menampilkan pesan di Console
console.log("Portofolio Indah berhasil dibuka!");

// Interaksi menu navigasi
const menuLinks = document.querySelectorAll("nav ul li a");

menuLinks.forEach(function(link) {
    link.addEventListener("click", function() {
        console.log("Menu dibuka: " + link.textContent);
    });
});

// Memperbarui tahun pada footer
const footerText = document.querySelector("footer p");

if (footerText) {
    footerText.textContent =
        "© " + new Date().getFullYear() +
        " Indah Nur Cahyani. All Rights Reserved.";
}


/* MENU NAVIGASI AKTIF */
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        navLinks.forEach(function(item) {
            item.classList.remove('active');
        });

        link.classList.add('active');
    });
});


/* ===== ANIMASI TEKS MENGETIK DI HOME ===== */


document.addEventListener("DOMContentLoaded", function () {
    const element = document.getElementById("typing-description");

    if (!element) {
        console.error("ID typing-description tidak ditemukan!");
        return;
    }

    const words = [
        "Saya tertarik pada desain visual dan editing.",
        "Saya sedang mempelajari UI/UX Design.",
        "Saya tertarik pada Web Development."
    ];

    let i = 0;
    let j = 0;
    let hapus = false;

    function mengetik() {
        const teks = words[i];

        element.textContent = teks.substring(0, j);

        if (!hapus) {
            j++;
            if (j > teks.length) {
                hapus = true;
                setTimeout(mengetik, 1200);
                return;
            }
        } else {
            j--;
            if (j < 0) {
                j = 0;
                hapus = false;
                i = (i + 1) % words.length;
            }
        }

        setTimeout(mengetik, hapus ? 40 : 70);
    }

    mengetik();
});

const typingDescription = document.getElementById("typing-description");

if (typingDescription) {
    const typingWords = [
        "Mahasiswi yang tertarik dengan teknologi",
        "Sedang belajar pemrograman",
        "Terus berkembang menjadi lebih baik"
    ];

    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = typingWords[wordIndex];

        typingDescription.textContent = currentWord.substring(
            0,
            letterIndex
        );

        if (!isDeleting) {
            letterIndex++;

            if (letterIndex > currentWord.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1200);
                return;
            }
        } else {
            letterIndex--;

            if (letterIndex < 0) {
                letterIndex = 0;
                isDeleting = false;
                wordIndex = (wordIndex + 1) % typingWords.length;
            }
        }

        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }

    typeEffect();
}


/* DARK MODE DAN LIGHT MODE */

function setupThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle");

    if (!themeToggle) {
        console.error("Tombol theme-toggle tidak ditemukan!");
        return;
    }

    themeToggle.addEventListener("click", function () {
        const isDark = document.body.classList.toggle("dark-mode");

        themeToggle.textContent = isDark ? "☀️" : "🌙";

        localStorage.setItem(
            "portfolio-theme",
            isDark ? "dark" : "light"
        );

        console.log("Tema aktif:", isDark ? "Gelap" : "Terang");
    });

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    } else {
        document.body.classList.remove("dark-mode");
        themeToggle.textContent = "🌙";
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupThemeToggle);
} else {
    setupThemeToggle();
}


/* TOGGLE MODE TERANG DAN GELAP */
const tombolTema = document.getElementById("theme-toggle");

if (tombolTema) {
    tombolTema.onclick = function () {
        document.body.classList.toggle("dark-mode");

        const modeGelap = document.body.classList.contains("dark-mode");

        tombolTema.textContent = modeGelap ? "☀️" : "🌙";

        console.log("Mode:", modeGelap ? "Gelap" : "Terang");
    };
} else {
    console.error("Tombol theme-toggle tidak ditemukan!");
}



function setupMoreMenu() {
    const button = document.getElementById("moreMenuButton");
    const menu = document.getElementById("moreMenuDropdown");

    if (!button || !menu) {
        console.error("Tombol atau dropdown menu tidak ditemukan.");
        return;
    }

    // Mencegah event listener terpasang berkali-kali
    if (button.dataset.menuReady === "true") return;
    button.dataset.menuReady = "true";

    function closeMenu() {
        menu.hidden = true;
        button.setAttribute("aria-expanded", "false");
    }

    button.addEventListener("click", function (event) {
        event.stopPropagation();

        menu.hidden = !menu.hidden;
        button.setAttribute("aria-expanded", String(!menu.hidden));
    });

    menu.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    document.addEventListener("click", function () {
        closeMenu();
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
            button.focus();
        }
    });

    // BAGIKAN PORTOFOLIO
    const shareButton = document.getElementById("shareMenuButton");

    if (shareButton) {
        shareButton.addEventListener("click", async function () {
            const url = window.location.href;

            try {
                if (navigator.share) {
                    await navigator.share({
                        title: document.title,
                        text: "Lihat portofolio saya!",
                        url: url
                    });
                } else {
                    window.prompt("Salin link portofolio:", url);
                }
            } catch (error) {
                if (error.name !== "AbortError") {
                    window.prompt("Salin link portofolio:", url);
                }
            }
        });
    }

    // PEMUTAR MUSIK
    const audio = document.getElementById("websiteMusic");
    const musicButton = document.getElementById("musicToggle");
    const musicStatus = document.getElementById("musicStatus");
    const volume = document.getElementById("musicVolume");

    if (audio && musicButton) {
        audio.volume = volume ? Number(volume.value) : 0.5;

        musicButton.addEventListener("click", async function () {
            if (audio.paused) {
                try {
                    await audio.play();
                    musicButton.textContent = "Ⅱ";
                    if (musicStatus) musicStatus.textContent = "Musik diputar";
                } catch (error) {
                    if (musicStatus) {
                        musicStatus.textContent = "Periksa file musik";
                    }
                }
            } else {
                audio.pause();
                musicButton.textContent = "▶";
                if (musicStatus) musicStatus.textContent = "Musik dijeda";
            }
        });

        if (volume) {
            volume.addEventListener("input", function () {
                audio.volume = Number(volume.value);
            });
        }
    }

    // TENTANG WEBSITE
    const aboutButton = document.getElementById("aboutMenuButton");

    if (aboutButton) {
        aboutButton.addEventListener("click", function () {
            alert("Selamat datang di portofolio pribadi saya!");
        });
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupMoreMenu);
} else {
    setupMoreMenu();
}




function setupVisitorProfile() {
    const profileButton = document.getElementById("themeMenuButton");
    const profileMenuName = document.getElementById("profileMenuName");
    const profile = document.getElementById("visitorProfile");
    const nameInput = document.getElementById("visitorNameInput");
    const nameDisplay = document.getElementById("visitorName");
    const saveButton = document.getElementById("saveVisitorName");

    if (
        !profileButton ||
        !profileMenuName ||
        !profile ||
        !nameInput ||
        !nameDisplay ||
        !saveButton
    ) return;

    // Buka atau tutup bagian input nama
    profileButton.addEventListener("click", function () {
        profile.hidden = !profile.hidden;

        if (!profile.hidden) {
            nameInput.focus();
        }
    });

    // Simpan nama dan langsung ubah tulisan menu
    function saveName() {
        const name = nameInput.value.trim();

        if (!name) {
            alert("Masukkan nama kamu terlebih dahulu!");
            nameInput.focus();
            return;
        }

        profileMenuName.textContent = name;
        nameDisplay.textContent = name;

        // Simpan nama pada browser pengunjung ini
        try {
            localStorage.setItem("visitorName", name);
        } catch (error) {
            // Nama tetap tampil selama halaman terbuka
        }

        nameInput.value = "";
        profile.hidden = true;
    }

    saveButton.addEventListener("click", saveName);

    // Tekan Enter untuk menyimpan nama
    nameInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            saveName();
        }
    });

    // Tampilkan nama yang sebelumnya disimpan di browser ini
    try {
        const savedName = localStorage.getItem("visitorName");

        if (savedName) {
            profileMenuName.textContent = savedName;
            nameDisplay.textContent = savedName;
        }
    } catch (error) {
        // Tetap bisa digunakan tanpa penyimpanan lokal
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupVisitorProfile);
} else {
    setupVisitorProfile();
}











document.addEventListener("DOMContentLoaded", function () {
  const intro = document.getElementById("introScreen");
  const button = document.getElementById("enterHomeButton");

  if (!intro || !button) {
    console.error("Intro atau tombol tidak ditemukan!");
    return;
  }

  button.addEventListener("click", function (event) {
    event.preventDefault();

    intro.classList.add("curtains-opening");
    button.disabled = true;

    setTimeout(function () {
      intro.classList.add("intro-finished");
      intro.setAttribute("aria-hidden", "true");
    }, 1600);
  });
});










/* Tutup menu titik tiga saat halaman digulir */
document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".more-menu");
    const dropdown = document.querySelector(".more-menu-dropdown");

    if (!menu || !dropdown) return;

    let scrollTimeout;

    window.addEventListener(
        "scroll",
        () => {
            clearTimeout(scrollTimeout);

            scrollTimeout = setTimeout(() => {
                dropdown.hidden = true;
                dropdown.classList.remove("active", "show", "open");
                menu.classList.remove("active", "show", "open");
            }, 80);
        },
        { passive: true }
    );

    window.addEventListener("touchmove", () => {
        dropdown.hidden = true;
        dropdown.classList.remove("active", "show", "open");
        menu.classList.remove("active", "show", "open");
    }, { passive: true });
});








/* ===== PORTFOLIO MUSIC PLAYER ===== */
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("musicToggle");
    const dropdown = document.getElementById("musicDropdown");
    const audio = document.getElementById("portfolioAudio");
    const playPause = document.getElementById("musicPlayPause");
    const status = document.getElementById("musicStatus");
    const tracks = document.querySelectorAll(".music-track");

    if (!toggle || !dropdown || !audio || !playPause || !status) return;

    let currentTrack = null;

    toggle.addEventListener("click", () => {
        const willOpen = dropdown.hidden;
        dropdown.hidden = !willOpen;
        toggle.setAttribute("aria-expanded", String(willOpen));
    });

    tracks.forEach((track) => {
        track.addEventListener("click", async () => {
            const src = track.dataset.src;

            if (currentTrack === src) {
                if (audio.paused) {
                    try {
                        await audio.play();
                    } catch {
                        status.textContent = "Musik gagal diputar";
                    }
                } else {
                    audio.pause();
                }
                return;
            }

            currentTrack = src;
            audio.src = src;

            tracks.forEach((item) => {
                item.classList.toggle("active", item === track);
            });

            status.textContent =
                track.querySelector("strong").textContent;

            try {
                await audio.play();
            } catch {
                status.textContent =
                    "Periksa file MP3 atau tekan play lagi";
            }
        });
    });

    playPause.addEventListener("click", async () => {
        if (!currentTrack) {
            status.textContent = "Pilih lagu terlebih dahulu";
            return;
        }

        if (audio.paused) {
            try {
                await audio.play();
            } catch {
                status.textContent = "Musik gagal diputar";
            }
        } else {
            audio.pause();
        }
    });

    audio.addEventListener("play", () => {
        playPause.textContent = "Ⅱ";
        playPause.setAttribute("aria-label", "Pause musik");
    });

    audio.addEventListener("pause", () => {
        playPause.textContent = "▶";
        playPause.setAttribute("aria-label", "Play musik");
    });

    audio.addEventListener("ended", () => {
        playPause.textContent = "▶";
        status.textContent = "Lagu selesai";
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".music-player")) {
            dropdown.hidden = true;
            toggle.setAttribute("aria-expanded", "false");
        }
    });
});











/* ==================================
   DISCOVER BETAWI CULTURE
================================== */

(() => {
    const modal = document.getElementById("betawiModal");
    const modalTitle = document.getElementById("betawiModalTitle");
    const modalText = document.getElementById("betawiModalText");
    const modalLink = document.getElementById("betawiModalLink");
    const closeButton = document.getElementById("betawiModalClose");
    const detailButtons = document.querySelectorAll(
        "#betawi-culture .betawi-detail-button"
    );

    if (!modal || !modalTitle || !modalText ||
        !modalLink || !closeButton) {
        return;
    }

    const cultureInfo = {
        rumah: {
            title: "Rumah Adat Betawi",
            text: "Rumah Kebaya merupakan salah satu rumah tradisional Betawi. Namanya berkaitan dengan bentuk atapnya yang menyerupai lipatan kebaya. Rumah tradisional Betawi juga mencerminkan kehidupan keluarga dan lingkungan masyarakatnya.",
            url: "https://id.wikipedia.org/wiki/Rumah_kebaya"
        },
        batik: {
            title: "Batik dan Pakaian Betawi",
            text: "Batik Betawi memiliki motif yang terinspirasi dari identitas dan kehidupan Jakarta, termasuk Ondel-ondel, ikon budaya Betawi. Pakaian tradisional Betawi juga memiliki beragam bentuk dan digunakan dalam kegiatan adat maupun acara tertentu.",
            url: "https://id.wikipedia.org/wiki/Batik_Betawi"
        },
        kuliner: {
            title: "Makanan Khas Betawi",
            text: "Kerak telor merupakan salah satu kuliner khas Betawi yang dibuat dari beras ketan, telur, dan bumbu, lalu dimasak secara tradisional. Selain kerak telor, Betawi juga memiliki makanan khas lain seperti soto Betawi dan asinan Betawi.",
            url: "https://id.wikipedia.org/wiki/Kerak_telor"
        },
        palang: {
            title: "Silat dan Tradisi Palang Pintu",
            text: "Palang Pintu merupakan tradisi dalam pernikahan Betawi yang memadukan adu pantun, unsur keagamaan, dan pertunjukan silat. Tradisi ini menjadi simbol penyambutan sekaligus menunjukkan keterampilan dan kesiapan pihak pengantin pria.",
            url: "https://id.wikipedia.org/wiki/Palang_pintu"
        }
    };

    function openCultureInfo(key) {
        const info = cultureInfo[key];

        if (!info) return;

        modalTitle.textContent = info.title;
        modalText.textContent = info.text;
        modalLink.href = info.url;

        modal.hidden = false;
        document.body.style.overflow = "hidden";
        closeButton.focus();
    }

    function closeCultureInfo() {
        modal.hidden = true;
        document.body.style.overflow = "";
    }

    detailButtons.forEach((button) => {
        button.addEventListener("click", () => {
            openCultureInfo(button.dataset.culture);
        });
    });

    closeButton.addEventListener("click", closeCultureInfo);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeCultureInfo();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modal.hidden) {
            closeCultureInfo();
        }
    });
})();















/* FOTO PRIBADI: KLIK UNTUK GANTI FOTO */
const photoSwitcher = document.getElementById("photoSwitcher");
const personalPhoto = document.getElementById("personalPhoto");

if (photoSwitcher && personalPhoto) {
    const personalPhotos = [
        "img/foto1.jpg",
        "img/foto2.jpg",
        "img/foto3.jpg"
    ];

    let currentPhoto = 0;

    photoSwitcher.addEventListener("click", function () {
        currentPhoto = (currentPhoto + 1) % personalPhotos.length;

        personalPhoto.src = personalPhotos[currentPhoto];
        personalPhoto.alt = "Foto pribadi " + (currentPhoto + 1);
    });
}














/* ===== TOMBOL LIHAT POSTER DAN DESAIN ===== */
function toggleArtwork(artworkId, button) {
    const artwork = document.getElementById(artworkId);

    if (!artwork) {
        console.error("Gambar tidak ditemukan:", artworkId);
        return;
    }

    const sedangTersembunyi = artwork.hidden;

    artwork.hidden = !sedangTersembunyi;

    if (sedangTersembunyi) {
        button.textContent =
            artworkId === "posterArtwork"
                ? "✕ Tutup Poster"
                : "✕ Tutup Desain";
    } else {
        button.textContent =
            artworkId === "posterArtwork"
                ? "👁 Lihat Poster"
                : "👁 Lihat Desain";
    }
}




















