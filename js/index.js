const pertanyaan = document.getElementById("pertanyaan")
const jawaban = document.getElementById("jawaban")
const loaders = document.getElementById("loaders")
const container = document.getElementsByClassName("container")

let init = 0

const botSay = (data) => {
    return [
        "Perkenalkan nama saya deabot. siapa nama kamu?",
        `Halo ${data?.nama}, berapa usia kamu?`,
        `Ohhh ${data?.usia}, hobi kamu apa ya?`,
        `wawww sama dong aku juga hobi ${data?.hobi}, btw punya pacar gak?`,
        `ohhh ${data?.pacar}, ya udah kalau gitu. udahan yah?`,
    ]
}

pertanyaan.innerHTML = botSay()[0]

let usersData = []

function botStart() {
    if (jawaban.value.length < 1) return alert("silahkan isi jawaban dulu")
    init++
    if (init === 1) {
        botDelay({ nama: jawaban.value })
    } else if (init === 2) {
        botDelay({ usia: jawaban.value })
    } else if (init === 3) {
        botDelay({ hobi: jawaban.value })
    } else if (init === 4) {
        botDelay({ pacar: jawaban.value })
    } else if (init === 5) {
        finishing()
    } else {
        botEnd()
    }
}

function botDelay(jawabanUser) {
    loaders.style.display = "block"
    container[0].style.filter = "blur(8px)"
    setTimeout(() => {
        pertanyaan.innerHTML = botSay(jawabanUser)[init]
        loaders.style.display = "none"
        container[0].style.filter = "none"
    }, [1000])
    usersData.push(jawaban.value)
    jawaban.value = ""
}

function finishing() {
    pertanyaan.innerHTML = `Thank u ya ${usersData[0]} udah main ke deabot 😉, kali-kali kita main ${usersData[2]} bareng ya!`
    jawaban.value = "siap thanks juga!"
}

function botEnd() {
    alert(
        `Terimakasih ${usersData[0]} sudah berkunjung, anda akan diarahkan ke halaman utama.`
    )
    window.location.reload()
}
(() => {
    'use strict'; // Button Mode Dark - Light Start
    const getStoredTheme = () => localStorage.getItem('theme');
    const setStoredTheme = theme => localStorage.setItem('theme', theme);
    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme();
        if (storedTheme) {
            return storedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    const setTheme = theme => {
        if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme);
        }
    };
    setTheme(getPreferredTheme());
    const updateDarkModeStatus = () => {
        const darkModeStatus = document.getElementById('darkModeStatus');
        if (darkModeStatus) {
            const currentTheme = getStoredTheme() || getPreferredTheme();
            darkModeStatus.textContent = ` (${currentTheme === 'dark' ? 'Dark' : 'Light'} Mode)`;
        }
    }; // Button Mode Dark - Light End
    const updateIcon = () => { // Button Icons Click Start
        const currentTheme = getStoredTheme() || getPreferredTheme();
        const icon = document.getElementById('darkModeIcon');
        if (icon) {
            icon.classList.remove('bi-moon-stars-fill');
            if (currentTheme === 'dark') {
                icon.classList.add('bi-moon-stars-fill', 'text-light');
            } else {
                icon.classList.add('bi-cloud-sun-fill', 'text-dark');
            }
        }
    };
    const toggleTheme = () => {
        const currentTheme = getStoredTheme() || getPreferredTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setStoredTheme(newTheme);
        setTheme(newTheme);
        updateDarkModeStatus();
        updateIcon();
    };
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleTheme);
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedTheme = getStoredTheme();
        if (storedTheme !== 'light' && storedTheme !== 'dark') {
            setTheme(getPreferredTheme());
            updateDarkModeStatus();
            updateIcon();
        }
    });
    updateDarkModeStatus();
    updateIcon();
})();