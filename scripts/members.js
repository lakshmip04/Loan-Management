document.getElementById('openSidebar').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');

    sidebar.classList.remove('-translate-x-full');
    mainContent.classList.remove('ml-0');
    mainContent.classList.add('sm:ml-64');
});

document.getElementById('closeSidebar').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');

    sidebar.classList.add('-translate-x-full');
    mainContent.classList.remove('sm:ml-64');
    mainContent.classList.add('ml-0');
});

function showPersonalDetails() {
    document.getElementById('personalDetails').classList.remove('hidden');
}

function fetchGuarantor() {
    document.getElementById('guarantorData').classList.remove('hidden');
}

document.getElementById('applyLoanButton').addEventListener('click', function() {
    document.getElementById('loanApplication').classList.remove('hidden');
});