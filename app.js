// ۱. دیتابیس فرضی املاک یزد
const properties = [
    { id: 1, title: "ویلا استخردار صفائیه", neighborhood: "صفائیه", style: "مدرن", area: 400, vector: [1, 0, 0, 1, 1] },
    { id: 2, title: "عمارت سنتی بافت تاریخی", neighborhood: "فهادان", style: "سنتی", area: 250, vector: [0, 1, 1, 0, 0] },
    { id: 3, title: "آپارتمان شیک آزادشهر", neighborhood: "آزادشهر", style: "مدرن", area: 150, vector: [1, 0, 0, 0, 1] },
    { id: 4, title: "خانه حیاط‌دار بلوار جمهوری", neighborhood: "جمهوری", style: "مدرن", area: 300, vector: [1, 0, 0, 1, 0] },
    { id: 5, title: "بوم‌گردی نزدیک زندان اسکندر", neighborhood: "بافت تاریخی", style: "سنتی", area: 180, vector: [0, 1, 1, 0, 1] },
];

// ۲. تابع محاسبه تشابه کسینوسی (Cosine Similarity)
function dotProduct(vecA, vecB) {
    return vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
}

function magnitude(vec) {
    return Math.sqrt(vec.reduce((sum, val) => sum + val * val, 0));
}

function getCosineSimilarity(vecA, vecB) {
    return dotProduct(vecA, vecB) / (magnitude(vecA) * magnitude(vecB));
}

// ۳. موتور توصیه گر
function getRecommendations(selectedId) {
    const selected = properties.find(p => p.id === selectedId);
    
    const scores = properties
        .filter(p => p.id !== selectedId)
        .map(p => ({
            ...p,
            similarity: getCosineSimilarity(selected.vector, p.vector)
        }))
        .sort((a, b) => b.similarity - a.similarity);

    renderList(scores.slice(0, 3), 'rec-list', true);
    document.getElementById('recommendations').classList.remove('hidden');
}

// ۴. رندر کردن کارت‌ها در UI
function renderList(data, containerId, isRec = false) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    data.forEach(p => {
        const card = document.createElement('div');
        card.className = `bg-white p-5 rounded-xl shadow-md border ${isRec ? 'border-green-200' : 'border-gray-100 hover:shadow-xl transition'}`;
        card.innerHTML = `
            <h3 class="font-bold text-lg mb-2">${p.title}</h3>
            <p class="text-sm text-gray-600">محله: ${p.neighborhood}</p>
            <p class="text-sm text-gray-600">سبک: ${p.style}</p>
            <button onclick="getRecommendations(${p.id})" class="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg text-sm">
                ${isRec ? 'مشاهده جزئیات' : 'یافتن موارد مشابه'}
            </button>
        `;
        container.appendChild(card);
    });
}

// اجرای اولیه
renderList(properties, 'property-list');