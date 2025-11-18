export async function getArticles() {
    const res = await fetch('/api/articles');
    if (!res.ok) {
        throw new Error('Failed to fetch articles');
    }
    return await res.json();
}