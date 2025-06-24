        document.addEventListener('DOMContentLoaded', function() {
            const galleryImages = document.querySelectorAll('.gallery-img');
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            const captionText = document.getElementById('caption');
            const closeBtn = document.querySelector('.close');
            
            galleryImages.forEach(img => {
                img.addEventListener('click', function() {
                    modal.style.display = "block";
                    modalImg.src = this.src;
                    captionText.innerHTML = this.alt;
                });
            });
            
            closeBtn.addEventListener('click', function() {
                modal.style.display = "none";
            });
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = "none";
                }
            });
            
            const commentForm = document.getElementById('commentForm');
            const commentsContainer = document.getElementById('commentsContainer');
            
            loadComments();
            
            commentForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const userName = document.getElementById('userName').value;
                const userEmail = document.getElementById('userEmail').value;
                const userRating = document.getElementById('userRating').value;
                const userComment = document.getElementById('userComment').value;
                
                const comment = {
                    name: userName,
                    email: userEmail,
                    rating: userRating,
                    text: userComment,
                    date: new Date().toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                };
                
                addComment(comment);
                
                saveComment(comment);
                
                commentForm.reset();
            });
            
            function addComment(comment) {
                const commentElement = document.createElement('div');
                commentElement.className = 'comment';
                
                let ratingStars = '';
                for (let i = 0; i < 5; i++) {
                    if (i < comment.rating) {
                        ratingStars += '★';
                    } else {
                        ratingStars += '☆';
                    }
                }
                
                const avatarLetter = comment.name.charAt(0).toUpperCase();
                
                commentElement.innerHTML = `
                    <div class="comment-rating">${ratingStars}</div>
                    <div class="comment-header">
                        <div class="comment-avatar">${avatarLetter}</div>
                        <div>
                            <div class="comment-author">${comment.name}</div>
                            <div class="comment-date">${comment.date}</div>
                        </div>
                    </div>
                    <div class="comment-content">${comment.text}</div>
                `;
                
                commentElement.style.opacity = '0';
                commentElement.style.transform = 'translateY(20px)';
                
                if (commentsContainer.children.length > 0) {
                    commentsContainer.insertBefore(commentElement, commentsContainer.children[1]);
                } else {
                    commentsContainer.appendChild(commentElement);
                }
                
                setTimeout(() => {
                    commentElement.style.opacity = '1';
                    commentElement.style.transform = 'translateY(0)';
                }, 10);
            }
            
            function saveComment(comment) {
                let comments = JSON.parse(localStorage.getItem('yogaComments')) || [];
                comments.unshift(comment);
                localStorage.setItem('yogaComments', JSON.stringify(comments));
            }
            
            function loadComments() {
                const comments = JSON.parse(localStorage.getItem('yogaComments')) || [];
                
                comments.forEach(comment => {
                    addComment(comment);
                });
            }
        });