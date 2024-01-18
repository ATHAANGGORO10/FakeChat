const input = document.getElementById("input");
const output = document.getElementById("output");
const container = document.querySelector(".container");
let init = 0;
const usersData = [];
const botSay = (data) => [ // Ketika anda ingin membuat atau menambahkan karangan dialog, anda dapat merubah dan menambahkan pada bagian ini.
    // "#",
    // `Ohh ${data?.nama}, #`,
    // `Ohh ${data?.nama}, #`,
    // `Ohh ${data?.usia}, #`,
    // `Ohh ${data?.hobi}, #`,
    // `Baiklah, ${data?.pacar}. #`,
];
output.innerHTML = botSay({})[0];
function botStart() {
    if (input.value.length < 1) return alert("Silahkan isi jawaban dulu.");
    init++;
    const inputUser = { // Dan jangan lupa ketika anda sudah membuat dialog baru beri property 
        // s
    };
    if (init < 5) {
        setTimeout(() => {
            output.innerHTML = botSay(inputUser)[init];
        }, 1000);
        usersData.push(input.value);
        input.value = "";
    } else if (init === 5) {
        output.innerHTML = `Terima kasih ${usersData[0]} sudah bermain dengan deabot! Sampai jumpa lain waktu.`;
        input.value = "";
    } else {
        alert(
            `Terima kasih ${usersData[0]} sudah berkunjung, anda akan diarahkan ke halaman utama.`
        );
        window.location.reload();
    }
}
function updateTime() {
    const timeElement = document.getElementById('time');
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
    timeElement.textContent = formattedTime;
}
updateTime();
setInterval(updateTime, 1000);
(() => {
    'use strict';
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
    };
    const updateIcon = () => {
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