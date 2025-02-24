document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".star");
    const ratingInput = document.querySelector("input[name='Avaliação']");
    
    stars.forEach(star => {
        star.addEventListener("click", function () {
            let value = parseFloat(this.getAttribute("data-value"));
            ratingInput.value = value;

            stars.forEach(s => {
                s.style.color = s.getAttribute("data-value") <= value ? "gold" : "gray";
            });
        });
    });
});