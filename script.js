const prompts = [
    {
        title: "Draw anything that comes to mind",
        subtitle: "Let it be simple, messy, or unfinished.",
        type: "drawing"
    },
    {
        title: "Emotional check-in",
        subtitle: "On a scale of 1–10, rate your overall mood. What might be contributing to your rating?"
    },
    {
        title: "Reflections",
        subtitle: "What's bringing you joy? What's bringing you stress?"
    },
    {
        title: "What am I carrying today?",
        subtitle: "Write about any thoughts or feelings you might be holding onto."
    },
    {
        title: "Set one intention",
        subtitle: "How do you want to feel? What do you want the next hour, day or week to be about?"
    },
    {
        title: "One thing I'm grateful for",
        subtitle: "Something specific, big or small."
    }
];

const affirmations = [

"I don't chase, I attract.",
"What I desire desires me.",
"I only attract abundance.",
"Manifesting is easy for me.",
"I seem to always be so lucky.",
"I'm naturally lucky.",
"Doors of opportunity are opening all around me all the time.",
"An opportunity will soon be presented to me that could change my entire life.",
"A big opportunity will be floating to me very soon.",
"I am open to receiving unexpected opportunities.",

"Things are always working out for me.",
"Everything always works out in my favour.",
"Everything works out for my highest good.",
"I am always at the right place at the right time.",
"When I jump, the net appears.",
"The universe supports me.",
"The universe is always conspiring in my favour.",
"I am supported and loved.",
"I am never alone and am fully supported on my journey.",
"I choose faith over fear.",
"I must only ask and it is given.",
"I can relax; I can do less and receive more.",
"I am so grateful to be taken care of.",

"Everyone here is happy to see me.",
"Everyone around me is rooting for me.",
"Everyone around me values and respects me.",
"My relationships are beautiful, fun and inspiring.",
"I attract friends who lift me up.",
"I give and receive love easily.",
"I deserve love and happiness.",
"There is more than enough room for everyone.",
"Someone else's success does not take away from my own.",
"I am so grateful for all the people who support and love me.",

"I am changing the world by being myself.",
"I love the process of creating.",
"People are counting on me and waiting for my art.",
"The world is open to receiving my creations.",
"I make people feel good about themselves.",
"I have a lot to give and the world is open to receiving me.",
"I use my blessings for good.",
"I am so grateful to be able to bless others through my work.",

"I can always find the silver lining.",
"If I am being presented with an obstacle now, it is to prepare me for something exciting in my future.",
"I am so grateful for all the life I've lived and will live.",
"I am so grateful to be growing and expanding.",
"The best is yet to come for me.",

"I deserve to take up space.",
"I am strong and powerful.",
"I am powerful.",
"I am competent and capable.",
"I am worthy and valuable.",
"I am worthy of love and affection.",
"I am beautiful inside and out.",
"My body and my mind are beautiful.",
"I am a shining star.",
"I am so strong, confident and bright.",
"I am always prioritised.",
"I am irresistible and unforgettable.",
"I am not afraid of my potential.",
"I was put on Earth for a reason.",
"I was born to expand.",
"I am a gift to others.",
"I have been given the talents I have for a reason.",
"I am so proud of myself.",

"I have amazing energy.",
"Beautiful energy and light flows through me now.",
"I am a light for myself and others.",
"I lift others up through my spirit and light.",
"I bless others by shining brightly.",
"I am floating like an angel on my own plane of reality.",
"I have an unlimited supply of creative energy.",
"Life is fun for me.",
"Life is magical and exciting for me.",

"Following my dreams is easy.",
"I enjoy working towards my dreams and goals.",
"My dream life is floating to me.",
"If I can imagine a reality, it is possible.",
"I deserve the desires of my heart.",
"I am so grateful for my dreams coming true.",

"I can take care of me.",
"I am my own boss.",
"If I need the resources, they will show up for me.",
"I have an unlimited supply of resources.",

"I trust my heart.",
"I trust myself and my feelings.",
"I love myself! I am so fun, cool, sweet, kind, intelligent and strong.",
"I am deeply kind and I radiate love.",
"I am a compassionate and loving soul.",
"I forgive myself for the past choices I've made.",
"I feel safe to be myself.",
"I am a friend to myself and others.",
"I am a safe space for myself and others.",
"My vulnerability is beautiful.",
"My pain is beautiful, it is making me into a more compassionate and kind person.",
"I can be both sad and inspiring at the same time.",
"Life is tender for me.",
"I am so grateful to feel so deeply.",
"My body tells me exactly what it needs.",
"No matter what happens, I will be okay.",

"Money flows to me easily.",
"I make money easily.",
"I am financially abundant.",
"I believe there is enough money for everyone.",
"I love to give money a good home.",
"I am so grateful to feel free in my lifestyle.",
"I am so grateful to have the resources I need to live my dream life.",
"I am grateful for the freedom money gives me.",
"I attract many fruitful opportunities and collaborations."

];

const titleEl = document.getElementById("prompt-title");
const subtitleEl = document.getElementById("prompt-subtitle");
const responseEl = document.getElementById("response");

const canvas = document.getElementById("drawing-canvas");
const ctx = canvas.getContext("2d");

const drawingActions = document.getElementById("drawing-actions");
const drawingWrap = document.getElementById("drawing-wrap");
const undoDrawingButton = document.getElementById("undo-drawing");
const clearDrawingButton = document.getElementById("clear-drawing");

const dayButtons = document.querySelectorAll(".day");
const dateFields = document.querySelectorAll(".date-field");

const affirmationButton = document.getElementById("affirmation-button");
const affirmationText = document.getElementById("affirmation-text");

function resetAffirmation() {
    affirmationText.textContent = "";

    const affirmationImage = affirmationButton.querySelector("img");
    affirmationImage.src = "affirmation-icon-rotated.png";
    affirmationImage.alt = "Click for an affirmation";
}

let isDrawing = false;
let strokes = [];
let currentStroke = [];

function loadPrompt() {
    const prompt = prompts[Math.floor(Math.random() * prompts.length)];

    titleEl.textContent = prompt.title;
    subtitleEl.textContent = prompt.subtitle;
    responseEl.innerText = "";

    if (prompt.type === "drawing") {
        responseEl.style.display = "none";
        drawingWrap.style.display = "block";

        resizeCanvas();
        clearCanvas();
    } else {
        responseEl.style.display = "block";
        drawingWrap.style.display = "none";
    }
    resetAffirmation();
}

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;

    ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
    );

    ctx.lineWidth = 1.4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#2f2a25";

    redrawCanvas();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    strokes = [];
    currentStroke = [];
}

function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    strokes.forEach(stroke => {
        if (stroke.length < 2) return;

        ctx.beginPath();
        ctx.moveTo(stroke[0].x, stroke[0].y);

        stroke.forEach(point => {
            ctx.lineTo(point.x, point.y);
        });

        ctx.stroke();
    });
}

function getPosition(event) {
    const rect = canvas.getBoundingClientRect();
    const point = event.touches ? event.touches[0] : event;

    return {
        x: point.clientX - rect.left,
        y: point.clientY - rect.top
    };
}

function startDrawing(event) {
    event.preventDefault();
    isDrawing = true;

    currentStroke = [];

    const pos = getPosition(event);
    currentStroke.push(pos);

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

function draw(event) {
    if (!isDrawing) return;

    event.preventDefault();

    const pos = getPosition(event);
    currentStroke.push(pos);

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
}

function stopDrawing() {
    if (!isDrawing) return;

    isDrawing = false;

    if (currentStroke.length > 0) {
        strokes.push(currentStroke);
    }

    currentStroke = [];
}

document
    .getElementById("new-prompt")
    .addEventListener("click", loadPrompt);

document
    .getElementById("download")
    .addEventListener("click", async () => {
        const toolbar = document.querySelector(".toolbar");

        toolbar.style.display = "none";

        await new Promise(resolve => setTimeout(resolve, 100));

        const canvasImage = await html2canvas(document.body, {
            scale: 2,
            backgroundColor: "#fffcf7",
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        });

        toolbar.style.display = "flex";

        const link = document.createElement("a");
        link.download = "journal.jpg";
        link.href = canvasImage.toDataURL("image/jpeg", 0.95);
        link.click();
    });

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDrawing);

undoDrawingButton.addEventListener("click", () => {
    strokes.pop();
    redrawCanvas();
});

clearDrawingButton.addEventListener("click", () => {
    clearCanvas();
});

window.addEventListener("resize", () => {
    if (canvas.style.display === "block") {
        resizeCanvas();
    }
});

dayButtons.forEach(button => {
    button.addEventListener("click", () => {
        dayButtons.forEach(day => {
            day.classList.remove("selected");
        });

        button.classList.add("selected");
    });
});

dateFields.forEach(field => {
    field.addEventListener("input", () => {
        field.innerText = field.innerText.replace(/\D/g, "");

        if (field.innerText.length > 2) {
            field.innerText = field.innerText.slice(0, 2);
        }

        const range = document.createRange();
        const selection = window.getSelection();

        range.selectNodeContents(field);
        range.collapse(false);

        selection.removeAllRanges();
        selection.addRange(range);
    });
});

function setToday() {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = String(today.getFullYear()).slice(-2);

    const dateFields = document.querySelectorAll(".date-field");

    dateFields[0].innerText = day;
    dateFields[1].innerText = month;
    dateFields[2].innerText = year;

    const dayIndex = today.getDay(); 
    // Sunday = 0, Monday = 1, Tuesday = 2, etc.

    const dayButtons = document.querySelectorAll(".day");

    const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
    // Converts to: Monday = 0 ... Sunday = 6

    dayButtons.forEach(button => {
        button.classList.remove("selected");
    });

    dayButtons[adjustedIndex].classList.add("selected");
}

affirmationButton.addEventListener("click", () => {

    const random =
        affirmations[Math.floor(Math.random() * affirmations.length)];

    affirmationText.textContent = random;

});

setToday();
loadPrompt();
