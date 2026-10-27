export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/admin-login/', '/api/'],
        },
        sitemap: 'https://ferixsoftware.pro/sitemap.xml', // <-- Naya Domain
    }
}