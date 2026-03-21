module.exports = {
    formatDate: (date) => {
        const d = new Date(date)

        return d.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    },

    sum: (a, b) => a + b,
}