// Sidebar elements
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

// Project Videos Logic (Hover plays inline, Click opens enlarged modal)
const projectVidboxes = document.querySelectorAll('.project-vidbox');
const videoModal = document.getElementById('videoModal');
const modalVideoPlayer = document.getElementById('modalVideoPlayer');
const modalVideoTitle = document.getElementById('modalVideoTitle');
const videoModalClose = document.querySelector('.video-modal-close');

projectVidboxes.forEach(function(vidbox) {
    const video = vidbox.querySelector('video');
    const hoverSign = vidbox.querySelector('.hover-sign');
    const projectCard = vidbox.closest('.project-card');
    const projectTitle = projectCard ? projectCard.querySelector('.project-info h1') : null;

    if (!video) return;

    // Hover: Play inline video inside card without enlarging
    vidbox.addEventListener("mouseenter", function() {
        video.play().catch(function(err) {
            console.log("Autoplay prevented:", err);
        });
        if (hoverSign) {
            hoverSign.classList.add("active");
        }
    });

    vidbox.addEventListener("mouseleave", function() {
        video.pause();
        if (hoverSign) {
            hoverSign.classList.remove("active");
        }
    });

    // CLICK: Open dead-centered enlarged video modal
    vidbox.addEventListener("click", function() {
        if (!videoModal || !modalVideoPlayer) return;
        modalVideoPlayer.src = video.src;
        try {
            modalVideoPlayer.currentTime = video.currentTime || 0;
        } catch(e) {}
        if (projectTitle) {
            modalVideoTitle.textContent = projectTitle.textContent;
        }
        videoModal.classList.add("open");
        document.body.classList.add("video-modal-open");
        modalVideoPlayer.play().catch(() => {});
    });
});

// Modal close handlers
if (videoModalClose) {
    videoModalClose.addEventListener("click", closeModal);
}
if (videoModal) {
    videoModal.addEventListener("click", function(e) {
        if (e.target === videoModal) {
            closeModal();
        }
    });
}

function closeModal() {
    if (!videoModal || !modalVideoPlayer) return;
    videoModal.classList.remove("open");
    document.body.classList.remove("video-modal-open");
    modalVideoPlayer.pause();
    modalVideoPlayer.src = "";
}

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && videoModal && videoModal.classList.contains("open")) {
        closeModal();
    }
});

// Disable mouse scroll while enlarged video modal is open
function preventScroll(e) {
    if (videoModal && videoModal.classList.contains('open')) {
        e.preventDefault();
    }
}

window.addEventListener('wheel', preventScroll, { passive: false });
window.addEventListener('touchmove', preventScroll, { passive: false });

// Sidebar elements
if (menu && sideBar) {
    menu.addEventListener("click", function(){
        sideBar.classList.remove("close-sidebar");
        sideBar.classList.add("open-sidebar");
    });
}

if (closeIcon && sideBar) {
    closeIcon.addEventListener("click", function(){
        sideBar.classList.remove("open-sidebar");
        sideBar.classList.add("close-sidebar");
    });
}