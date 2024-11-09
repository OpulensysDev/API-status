module.exports = (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'API esta funcinando corretamente',
        timestamp: new Date().toISOString()
    });
};