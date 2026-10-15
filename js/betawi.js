
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("betawiModal");
    const title = document.getElementById("betawiModalTitle");
    const text = document.getElementById("betawiModalText");
    const link = document.getElementById("betawiModalLink");
    const closeButton = document.getElementById("betawiModalClose");

    if (!modal || !title || !text || !link || !closeButton) {
        console.error("Elemen popup budaya Betawi tidak ditemukan!");
        return;
    }

    const cultureData = {
        rumah: {
            title: "Rumah Adat Betawi (Rumah Kebaya)",
            text: "Rumah Kebaya merupakan rumah adat Betawi yang dikenal dengan bentuk atap menyerupai lipatan kebaya. Rumah ini mencerminkan keramahan dan kebersamaan masyarakat Betawi.",
            url: "https://ruangarsitek.com/rumah-adat-betawi/"
        },
        batik: {
            title: "Batik & Pakaian Betawi",
            text: "Batik Betawi memiliki motif yang terinspirasi dari kehidupan masyarakat Jakarta, termasuk Ondel-ondel dan berbagai unsur budaya lokal. Pakaian tradisional Betawi juga memiliki ciri khas tersendiri.",
            url: "https://mediaindonesia.com/megapolitan/786926/baju-adat-betawi-sejarah-filosofi-jenis-dan-fungsinya"
        },
        kuliner: {
            title: "Makanan Khas Betawi",
            text: "Kerak telor merupakan salah satu kuliner khas Betawi yang dibuat menggunakan beras ketan, telur, ebi, dan bumbu. Selain itu, ada juga soto Betawi, asinan Betawi, dan nasi uduk.",
            url: "https://www.goodnewsfromindonesia.id/indonesiana/sosial-budaya/asal-usul-kerak-telor-makanan-khas-betawi-yang-legendaris"
        },
        palang: {
            title: "Silat & Palang Pintu",
            text: "Palang Pintu merupakan tradisi dalam pernikahan Betawi yang memadukan seni bela diri silat dengan berbalas pantun. Tradisi ini menjadi bagian dari penyambutan pihak pengantin pria.",
            url: "https://negerikami.id/budaya/tradisi-palang-pintu-betawi-adu-silat-hingga-pantun-pernikahan-yang-sarat-makna-budaya/"
        }
    };

    document.querySelectorAll(
        "#betawi-culture .betawi-detail-button"
    ).forEach(function (button) {
        button.addEventListener("click", function () {
            const data = cultureData[button.dataset.culture];

            if (!data) {
                console.error("Data budaya tidak ditemukan:", button.dataset.culture);
                return;
            }

            title.textContent = data.title;
            text.textContent = data.text;
            link.href = data.url;

            modal.hidden = false;
            document.body.style.overflow = "hidden";
        });
    });

    function closeModal() {
        modal.hidden = true;
        document.body.style.overflow = "";
    }

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !modal.hidden) {
            closeModal();
        }
    });

    console.log("JavaScript budaya Betawi berhasil dimuat!");
});
