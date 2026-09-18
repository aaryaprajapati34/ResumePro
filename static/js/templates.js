/* =========================================================
   ResumePro - Templates Page
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const templateButtons = document.querySelectorAll(
        ".template-select-btn"
    );

    const templateCards = document.querySelectorAll(
        ".template-card"
    );


    /* =====================================================
       TEMPLATE SELECTION
       ===================================================== */

    templateButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const template =
                button.dataset.template;

            if (!template) {
                return;
            }


            /* Save selected template */

            localStorage.setItem(
                "resumepro_selected_template",
                template
            );


            /* Remove previous selection */

            templateCards.forEach(function (card) {

                card.classList.remove(
                    "selected-template"
                );

            });


            /* Highlight selected card */

            const selectedCard =
                document.querySelector(
                    `.template-card[data-template="${template}"]`
                );

            if (selectedCard) {

                selectedCard.classList.add(
                    "selected-template"
                );

            }


            /* Show selected */

            button.textContent =
                "Selected ✓";


            /* Reset other buttons */

            templateButtons.forEach(function (otherButton) {

                if (otherButton !== button) {

                    otherButton.textContent =
                        "Use Template";

                }

            });


            /* Go back to Dashboard */

            setTimeout(function () {

                window.location.href =
                    "/dashboard";

            }, 500);

        });

    });


    /* =====================================================
       RESTORE PREVIOUS SELECTION
       ===================================================== */

    const savedTemplate =
        localStorage.getItem(
            "resumepro_selected_template"
        );

    if (savedTemplate) {

        const savedCard =
            document.querySelector(
                `.template-card[data-template="${savedTemplate}"]`
            );

        const savedButton =
            document.querySelector(
                `.template-select-btn[data-template="${savedTemplate}"]`
            );


        if (savedCard) {

            savedCard.classList.add(
                "selected-template"
            );

        }


        if (savedButton) {

            savedButton.textContent =
                "Selected ✓";

        }

    }


    /* =====================================================
       CARD KEYBOARD ACCESS
       ===================================================== */

    templateCards.forEach(function (card) {

        card.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    const button =
                        card.querySelector(
                            ".template-select-btn"
                        );

                    if (button) {

                        event.preventDefault();

                        button.click();

                    }

                }

            }
        );

    });

});