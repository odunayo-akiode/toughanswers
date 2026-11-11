
// ==========================================
// MOBILE NAVIGATION
// ==========================================

function toggleMenu() {
    const navigation = document.getElementById("navigation");

    if (!navigation) return;

    navigation.classList.toggle("show");

    const menuButton = document.querySelector(
        '[aria-controls="navigation"]'
    );

    if (menuButton) {
        menuButton.setAttribute(
            "aria-expanded",
            navigation.classList.contains("show")
        );
    }
}


// ==========================================
// SEARCH BOX
// ==========================================

function openSearch() {
    const searchBox = document.getElementById("searchBox");

    if (!searchBox) return;

    searchBox.classList.toggle("show");

    const searchButton = document.querySelector(
        '[aria-controls="searchBox"]'
    );

    if (searchButton) {
        searchButton.setAttribute(
            "aria-expanded",
            searchBox.classList.contains("show")
        );
    }

    if (searchBox.classList.contains("show")) {
        const searchInput = document.getElementById("searchInput");

        if (searchInput) {
            searchInput.focus();
        }
    }
}


// ==========================================
// SAFE TEXT DISPLAY
// ==========================================

function escapeHTML(text) {
    return String(text).replace(/[&<>"']/g, character => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[character];
    });
}


// ==========================================
// WEBSITE SEARCH
// ==========================================

function searchSite() {

    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    if (!searchInput || !searchResults) return;

    const input = searchInput.value.trim().toLowerCase();

    if (input === "") {
        alert("Please enter a question or topic to search.");
        searchInput.focus();
        return;
    }


    // ALL WEBSITE CATEGORIES AND FEATURED CONTENT

    const articles = [

        {
            title: "Life",

            description: "Questions and answers about life, purpose, personal decisions, challenges, difficult seasons, happiness, success, failure, choices and everyday living.",

            keywords: [
                "life", "purpose", "living",
                "happiness", "success", "failure",
                "challenges", "decisions", "choices",
                "meaning of life", "life problems",
                "difficult seasons", "personal decisions"
            ],

            url: "article-life.html"
        },


        {
            title: "Career",

            description: "Questions and answers about career, work, jobs, employment, profession, skills, business, workplace, salary, promotion, interviews, CV, leadership and professional growth.",

            keywords: [
                "career", "work", "job", "jobs",
                "employment", "profession", "professional",
                "workplace", "salary", "promotion",
                "interview", "interviews", "cv", "resume",
                "skills", "leadership", "boss", "office",
                "business", "workers", "employee",
                "unemployment", "retirement", "entrepreneurship"
            ],

            url: "article-career.html"
        },


        {
            title: "Business",

            description: "Questions and answers about business, entrepreneurship, starting a business, business management, investment, money, customers, marketing, leadership and financial growth.",

            keywords: [
                "business", "entrepreneur", "entrepreneurship",
                "startup", "start a business", "investment",
                "investing", "money", "finance",
                "profit", "loss", "marketing",
                "customers", "management", "small business",
                "business ideas", "business growth",
                "financial growth"
            ],

            url: "article-business.html"
        },


        {
            title: "Technology",

            description: "Questions and answers about technology, digital life, artificial intelligence, AI, computers, phones, internet, social media, cybersecurity, software, apps, digital tools, innovation and the future.",

            keywords: [
                "technology", "digital", "artificial intelligence",
                "ai", "computer", "computers", "phone",
                "phones", "internet", "social media",
                "cybersecurity", "software", "apps",
                "applications", "innovation", "gadgets",
                "mobile", "online", "website",
                "websites", "programming", "coding",
                "robotics", "cyber", "data"
            ],

            url: "article-technology.html"
        },


        {
            title: "Faith",

            description: "Questions and answers about faith, Christianity, God, prayer, the Bible, salvation, spiritual growth, church, Christian living, purpose and the challenges of the Christian journey.",

            keywords: [
                "faith", "God", "Christianity",
                "Christian", "Christians", "Jesus",
                "prayer", "Bible", "salvation",
                "church", "spiritual", "spirituality",
                "holy spirit", "worship", "sin",
                "forgiveness", "Christian living",
                "spiritual growth", "religion"
            ],

            url: "article-faith.html"
        },


        {
            title: "Opinion",

            description: "Thought-provoking opinions, perspectives and discussions about society, culture, human behaviour, leadership, public issues and everyday experiences.",

            keywords: [
                "opinion", "opinions", "perspective",
                "views", "society", "culture",
                "human behaviour", "behaviour",
                "social issues", "public issues",
                "discussion", "debate", "commentary",
                "thoughts", "current affairs"
            ],

            url: "article-opinion.html"
        },


        {
            title: "Education",

            description: "Questions and answers about education, learning, schools, universities, students, teachers, examinations, academic performance, study habits, scholarships and career choices.",

            keywords: [
                "education", "school", "schools",
                "university", "universities",
                "student", "students", "teacher",
                "teachers", "learning", "examination",
                "exams", "study", "scholarship",
                "academic", "academic performance",
                "admission", "courses", "teaching",
                "classroom", "study habits"
            ],

            url: "article-education.html"
        },


        {
            title: "Relationships",

            description: "Questions and answers about relationships, marriage, love, dating, friendship, family, husband, wife, couples, communication, trust, conflict, forgiveness and human connection.",

            keywords: [
                "relationship", "relationships",
                "marriage", "married", "love",
                "dating", "friendship", "friends",
                "family", "husband", "wife",
                "couples", "communication",
                "trust", "conflict", "forgiveness",
                "divorce", "separation", "children",
                "parenting", "romance"
            ],

            url: "article-relationships.html"
        },


        {
            title: "Personal Growth",

            description: "Questions and answers about personal development, self-improvement, confidence, discipline, character, emotional intelligence, habits, motivation, leadership and discovering your potential.",

            keywords: [
                "personal growth", "personal development",
                "self improvement", "self-development",
                "confidence", "discipline",
                "character", "motivation",
                "emotional intelligence", "habits",
                "leadership development", "potential",
                "mindset", "growth", "self awareness",
                "time management", "productivity"
            ],

            url: "article-personal-growth.html"
        },


        {
            title: "Featured Series: Discovering Your Purpose",

            description: "A special series exploring purpose, direction, personal development and the struggle to discover meaning in life.",

            keywords: [
                "featured series", "episode 01",
                "discovering your purpose",
                "purpose in life", "find my purpose",
                "discover purpose", "life direction",
                "meaning", "calling"
            ],

            url: "article-personal-development-episode-01.html"
        }

    ];


    // FIND MATCHING CATEGORIES

    const searchTerms = input.split(/\s+/).filter(Boolean);

    const results = articles.filter(article => {

        const searchableText = [
            article.title,
            article.description,
            ...article.keywords
        ].join(" ").toLowerCase();

        return searchTerms.every(term =>
            searchableText.includes(term)
        );

    });


    // NO RESULTS MESSAGE

    if (results.length === 0) {

        searchResults.innerHTML = `
            <div class="search-result-card">
                <span>NO RESULTS FOUND</span>

                <h3>We couldn't find a matching topic.</h3>

                <p>
                    Try searching for Life, Career, Business,
                    Technology, Faith, Opinion, Education,
                    Relationships or Personal Growth.
                </p>
            </div>
        `;

        searchResults.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        return;
    }


    // DISPLAY SEARCH RESULTS

    searchResults.innerHTML = `
        <div class="search-results-heading">

            <h2>SEARCH RESULTS</h2>

            <p>
                ${results.length} matching
                ${results.length === 1 ? "category" : "categories"}
                found for "${escapeHTML(input)}".
            </p>

        </div>

        ${results.map(article => `

            <div class="search-result-card">

                <span>SEARCH RESULT</span>

                <h3>${escapeHTML(article.title)}</h3>

                <p>${escapeHTML(article.description)}</p>

                <a href="${article.url}">
                    Read article →
                </a>

            </div>

        `).join("")}
    `;


    searchResults.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// ==========================================
// ASK A QUESTION
// ==========================================

function openQuestionForm() {

    const formSection = document.getElementById("questionForm");

    if (!formSection) return;

    formSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// ==========================================
// SUBMIT QUESTION THROUGH FORMSPREE
// ==========================================

async function submitQuestion(event) {

    event.preventDefault();

    const form = document.getElementById("toughQuestionForm");

    if (!form) return;

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const submitButton = form.querySelector(
        'button[type="submit"]'
    );

    if (!submitButton) return;

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {

        const response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {

            form.reset();

            alert(
                "Thank you! Your question has been received. We appreciate your contribution to TOUGHanswers."
            );

        } else {

            alert(
                "Something went wrong while submitting your question. Please try again."
            );

        }

    } catch (error) {

        alert(
            "Unable to submit your question. Please check your internet connection and try again."
        );

    } finally {

        submitButton.disabled = false;
        submitButton.textContent = "Submit Question →";

    }

}
