function toggleMenu() {
    const navigation = document.getElementById("navigation");

    navigation.classList.toggle("show");
}


function openSearch() {
    const searchBox = document.getElementById("searchBox");

    searchBox.classList.toggle("show");

    if (searchBox.classList.contains("show")) {
        document.getElementById("searchInput").focus();
    }
}


function searchSite() {

    const input =
        document.getElementById("searchInput").value.trim().toLowerCase();

    if (input === "") {

        alert("Please enter a question or topic to search.");

        return;

    }

    const articles = [

        {
    title: "Career",
    description: "Questions and answers about career, work, jobs, employment, profession, skills, business, workplace, salary, promotion, interviews, CV, leadership and professional growth.",
    keywords: [
        "career",
        "work",
        "job",
        "jobs",
        "employment",
        "profession",
        "professional",
        "workplace",
        "salary",
        "promotion",
        "interview",
        "interviews",
        "cv",
        "resume",
        "skills",
        "leadership",
        "boss",
        "office",
        "business"
    ],
    url: "article-career.html"
},

        {
            title: "Relationships",
            description: "Questions and answers about relationships, marriage, love, dating, friendship, family, husband, wife, couples, communication, trust, conflict, forgiveness and human connection.",
            url: "article-relationships.html"
        },

        {
            title: "Technology",
            description: "Questions and answers about technology, digital life, artificial intelligence, AI, computers, phones, internet, social media, cybersecurity, software, apps, digital tools, innovation and the future.",
            url: "article-technology.html"
        }

    ];

    const results =
    articles.filter(article =>
        article.title.toLowerCase().includes(input) ||
        article.description.toLowerCase().includes(input) ||
        (article.keywords &&
            article.keywords.some(keyword =>
                keyword.toLowerCase().includes(input)
            )
        )
    );

    if (results.length === 0) {

        alert(
            "No TOUGHanswers article found for:\n\n" +
            input +
            "\n\nTry searching for Career, Relationships or Technology."
        );

        return;

    }

    if (results.length === 1) {

    const searchResults =
        document.getElementById("searchResults");

    console.log("NEW SEARCH CODE IS RUNNING");

    searchResults.innerHTML = `
        <div class="search-result-card">
            <span>SEARCH RESULT</span>
            <h3>${results[0].title}</h3>
            <p>${results[0].description}</p>
            <a href="${results[0].url}">Read article →</a>
        </div>
    `;

    return;

}

    let message =
        "TOUGHanswers search results:\n\n";

    results.forEach((article, index) => {

        message +=
            (index + 1) +
            ". " +
            article.title +
            "\n" +
            article.description +
            "\n\n";

    });

    alert(message);
}


function openQuestionForm() {

    const formSection =
        document.getElementById("questionForm");

    formSection.scrollIntoView({
        behavior: "smooth"
    });

}


async function submitQuestion(event) {

    event.preventDefault();

    const form =
        document.getElementById("toughQuestionForm");

    if (!form.checkValidity()) {

        form.reportValidity();

        return;

    }

    const submitButton =
        form.querySelector('button[type="submit"]');

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {

        const response = await fetch(
            form.action,
            {
                method: "POST",
                body: new FormData(form),
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        if (response.ok) {

            form.reset();

            submitButton.disabled = false;
            submitButton.textContent = "Submit Question →";

            alert(
                "Thank you! Your question has been received."
            );

        } else {

            submitButton.disabled = false;
            submitButton.textContent = "Submit Question →";

            alert(
                "Something went wrong. Please try again."
            );

        }

    } catch (error) {

        submitButton.disabled = false;
        submitButton.textContent = "Submit Question →";

        alert(
            "Unable to submit your question. Please check your internet connection and try again."
        );

    }

}



function resetQuestionForm() {

    const form =
        document.getElementById("toughQuestionForm");

    const success =
        document.getElementById("questionSuccess");

    form.reset();

    form.style.display = "block";

    success.classList.remove("show");
}