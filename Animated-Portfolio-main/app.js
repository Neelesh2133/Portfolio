// Sidebar elements
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

// Project Videos Hover & Modal logic
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

    function activateHover() {
        vidbox.classList.add("is-hovered");
        document.body.classList.add("video-hover-active");
        video.play().catch(function(err) {
            console.log("Autoplay prevented:", err);
        });
        if (hoverSign) {
            hoverSign.classList.add("active");
        }
    }

    function deactivateHover() {
        vidbox.classList.remove("is-hovered");
        document.body.classList.remove("video-hover-active");
        video.pause();
        if (hoverSign) {
            hoverSign.classList.remove("active");
        }
    }

    vidbox.addEventListener("mouseenter", activateHover);
    video.addEventListener("mouseenter", activateHover);

    vidbox.addEventListener("mouseleave", function(e) {
        if (e.relatedTarget !== video && !video.contains(e.relatedTarget)) {
            deactivateHover();
        }
    });

    video.addEventListener("mouseleave", function(e) {
        if (e.relatedTarget !== vidbox && !vidbox.contains(e.relatedTarget)) {
            deactivateHover();
        }
    });

    // Click to open full resolution video modal
    vidbox.addEventListener("click", function() {
        if (!videoModal || !modalVideoPlayer) return;
        modalVideoPlayer.src = video.src;
        if (projectTitle) {
            modalVideoTitle.textContent = projectTitle.textContent;
        }
        videoModal.classList.add("open");
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
    modalVideoPlayer.pause();
    modalVideoPlayer.src = "";
}

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && videoModal && videoModal.classList.contains("open")) {
        closeModal();
    }
});

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