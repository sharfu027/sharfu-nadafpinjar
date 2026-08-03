// Vercel Serverless Function to handle /api/donations requests cleanly with 200 OK
export default function handler(req, res) {
    // Enable CORS for all requests
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Return empty array / success response with 200 OK status to eliminate browser 404 console errors
    res.status(200).json({
        success: true,
        donations: [],
        data: []
    });
}
