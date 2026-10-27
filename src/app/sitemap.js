export default function sitemap() {
    return [
        {
            url: 'https://ferixsoftware.pro/',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://ferixsoftware.pro/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // Agar aapke paas koi aur page hai (jaise contact), toh usko bhi yahan add kar sakte hain
    ]
}