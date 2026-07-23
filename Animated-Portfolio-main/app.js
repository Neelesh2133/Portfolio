// Sidebar elements
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

// Project Videos Hover & Modal logic
const projectVidboxes = document.querySelectorAll('.project-vidbox');
const hoverVideoOverlay = document.getElementById('hoverVideoOverlay');
const hoverVideoPlayer = document.getElementById('hoverVideoPlayer');

const videoModal = document.getElementById('videoModal');
const modalVideoPlayer = document.getElementById('modalVideoPlayer');
const modalVideoTitle = document.getElementById('modalVideoTitle');
const videoModalClose = document.querySelector('.video-modal-close');

let currentActiveVidbox = null;

projectVidboxes.forEach(function(vidbox) {
    const video = vidbox.querySelector('video');
    const hoverSign = vidbox.querySelector('.hover-sign');
    const projectCard = vidbox.closest('.project-card');
    const projectTitle = projectCard ? projectCard.querySelector('.project-info h1') : null;

    if (!video) return;

    function activateHover() {
        currentActiveVidbox = vidbox;
        vidbox.classList.add("is-hovered");
        document.body.classList.add("video-hover-active");
        
        if (hoverVideoPlayer && hoverVideoOverlay) {
            if (hoverVideoPlayer.src !== video.src) {
                hoverVideoPlayer.src = video.src;
            }
            try {
                hoverVideoPlayer.currentTime = video.currentTime || 0;
            } catch(e) {}
            hoverVideoOverlay.classList.add("active");
            hoverVideoPlayer.play().catch(function(err) {
                console.log("Autoplay prevented:", err);
            });
        }
        
        video.play().catch(() => {});
        if (hoverSign) {
            hoverSign.classList.add("active");
        }
    }

    function deactivateHover() {
        if (currentActiveVidbox === vidbox) {
            currentActiveVidbox = null;
        }
        vidbox.classList.remove("is-hovered");
        document.body.classList.remove("video-hover-active");
        
        if (hoverVideoOverlay) {
            hoverVideoOverlay.classList.remove("active");
        }
        if (hoverVideoPlayer) {
            hoverVideoPlayer.pause();
        }
        video.pause();
        if (hoverSign) {
            hoverSign.classList.remove("active");
        }
    }

    vidbox.addEventListener("mouseenter", activateHover);

    vidbox.addEventListener("mouseleave", function(e) {
        if (e.relatedTarget && hoverVideoOverlay && hoverVideoOverlay.contains(e.relatedTarget)) {
            return;
        }
        deactivateHover();
    });

    // Click to open full resolution video modal
    vidbox.addEventListener("click", function() {
        if (!videoModal || !modalVideoPlayer) return;
        deactivateHover();
        modalVideoPlayer.src = video.src;
        if (projectTitle) {
            modalVideoTitle.textContent = projectTitle.textContent;
        }
        videoModal.classList.add("open");
        modalVideoPlayer.play().catch(() => {});
    });
});

if (hoverVideoOverlay) {
    hoverVideoOverlay.addEventListener("mouseleave", function() {
        if (currentActiveVidbox) {
            currentActiveVidbox.classList.remove("is-hovered");
        }
        document.body.classList.remove("video-hover-active");
        hoverVideoOverlay.classList.remove("active");
        if (hoverVideoPlayer) hoverVideoPlayer.pause();
    });

    hoverVideoOverlay.addEventListener("click", function() {
        if (currentActiveVidbox) {
            currentActiveVidbox.click();
        }
    });
}

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